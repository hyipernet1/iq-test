import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma-client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID as string;
const TRIAL_PRICE_ID = process.env.STRIPE_TRIAL_PRICE_ID as string;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (error) {
    return new NextResponse(`Invalid signature, ${error}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerDetails = session.customer_details;

    if (customerDetails && customerDetails.email) {
      const user = await prisma.user.findUnique({
        where: { email: customerDetails.email },
      });

      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      if (!user.customerId) {
        try {
          const checkoutSession = await stripe.checkout.sessions.create({
            customer_email: customerDetails.email,
            line_items: [
              {
                price: TRIAL_PRICE_ID,
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${process.env.BASE_URL}/test/completed`,
            cancel_url: `${process.env.BASE_URL}/`,
            customer_creation: "always",
          });

          await stripe.subscriptions.create({
            customer: checkoutSession.customer as string,
            items: [{ price: MONTHLY_PRICE_ID }],
            trial_period_days: 2,
          });

          await prisma.user.update({
            where: { email: customerDetails.email },
            data: {
              tier: "MONTH",
              customerId: checkoutSession.customer as string,
            },
          });
        } catch (error) {
          return new Response("Error creating trial subscription", {
            status: 500,
          });
        }
      } else {
        try {
          await prisma.user.update({
            where: { email: customerDetails.email },
            data: { tier: "MONTH", customerId: user.customerId },
          });
        } catch (error) {
          return new Response("Error updating user tier", { status: 500 });
        }
      }
    } else {
      console.log("User email not found");
    }
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const user = await prisma.user.findUnique({
      where: { customerId: customerId },
    });

    if (user) {
      try {
        await prisma.user.update({
          where: { customerId: customerId },
          data: { tier: "BASIC" }, // Оновлення subscriptionId
        });
      } catch (error) {
        console.error("Error updating user tier to Basic:", error);
      }
    } else {
      console.log("User with this customerId not found");
    }
  }

  return new Response("Webhook received", { status: 200 });
}
