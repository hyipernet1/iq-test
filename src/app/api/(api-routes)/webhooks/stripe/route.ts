import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma-client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createHash } from "crypto";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID as string;
const TRIAL_PRICE_ID = process.env.STRIPE_TRIAL_PRICE_ID as string; // Ціна для trial

function generateCustomerId(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

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
    const email = customerDetails?.email;

    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        console.log("User not found");

        const customerId = generateCustomerId(email);

        try {
          const checkoutSession = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [
              {
                price: TRIAL_PRICE_ID,
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${process.env.BASE_URL}/test/completed`,
            cancel_url: `${process.env.BASE_URL}/`,
          });

          console.log("Checkout session created:", checkoutSession.id);

          const subscription = await stripe.subscriptions.create({
            customer: checkoutSession.customer as string,
            items: [{ price: MONTHLY_PRICE_ID }],
            trial_period_days: 2,
          });

          console.log("Subscription created:", subscription.id);

          await prisma.user.update({
            where: { email },
            data: {
              tier: "MONTH",
              customerId: customerId,
            },
          });

          console.log(
            `User ${email} has started trial and subscribed to monthly plan.`
          );
        } catch (error) {
          console.error("Error creating trial subscription:", error);
          return new Response("Error creating trial subscription", {
            status: 500,
          });
        }
      } else {
        if (!user.customerId) {
          const customerId = generateCustomerId(email);
          try {
            await prisma.user.update({
              where: { email: email },
              data: { customerId: customerId }, 
            });

            console.log(`User ${email} already exists, customerId added.`);
          } catch (error) {
            console.error("Error adding customerId:", error);
            return new Response("Error adding customerId", { status: 500 });
          }
        }

        try {
          await prisma.user.update({
            where: { email: email },
            data: { tier: "MONTH" },
          });

          console.log(
            `User ${email} already has customerId, tier updated to 'Month'.`
          );
        } catch (error) {
          console.error("Error updating user tier:", error);
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
          data: { tier: "BASIC" },
        });

        console.log(
          `User ${user.email} subscription was canceled, tier updated to 'Basic'.`
        );
      } catch (error) {
        console.error("Error updating user tier to Basic:", error);
      }
    } else {
      console.log("User with this customerId not found");
    }
  }

  return new Response("Webhook received", { status: 200 });
}
