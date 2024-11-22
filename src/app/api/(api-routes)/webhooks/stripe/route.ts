import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma-client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (error) {
    return new NextResponse("invalid signature", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerDetails = session.customer_details;
    if (customerDetails && customerDetails.email) {
      const user = await prisma.user.update({
        where: { email: customerDetails.email },
        // TODO: FIX CUSTOMER ID ERROR
        data: { tier: "MONTH", customerId: session.customer as string },
      });
    } else {
      console.log("user not found");
    }
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    if (subscription && subscription.customer) {
      const user = await prisma.user.update({
        // TODO: FIX CUSTOMER ID ERROR
        where: { customerId: subscription.customer as string },
        data: { tier: "BASIC" },
      });
    } else {
      console.log("user not found");
    }
  }

  return new Response("Webhook received", { status: 200 });
}
