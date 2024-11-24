import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma-client";
import { NextResponse } from "next/server";
import { tokenService } from "../../auth/tokens";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  const bearer = req.headers.get("Authorization");
  const token = bearer?.split("Bearer ")[1];

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userData = tokenService.validateAccessToken(token) as User;
  const { customerId } = userData;

  if (!customerId) {
    return NextResponse.json(
      { message: "No user or customer ID found. Maybe page refreshing can help." },
      { status: 404 }
    );
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: { customerId },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User is not found" },
          { status: 404 }
        );
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        limit: 1,
      });

      const mySubscriptions = subscriptions.data.filter(
        (el) => el.customer == customerId
      );

      if (subscriptions.data.length === 0 || !mySubscriptions) {
        return NextResponse.json(
          {
            message:
              "No active subscriptions found",
          },
          { status: 404 }
        );
      }

      mySubscriptions.forEach(async (sub) => {
        await stripe.subscriptions.cancel(sub.id);
        console.log("Canceled subscription:", sub);
      });

      return NextResponse.json(
        { message: "Subscription canceled" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error canceling subscription:", error);
      return NextResponse.json(
        { message: `Error canceling subscription: ${error}` },
        { status: 500 }
      );
    }
  }
}
