"use client";

import clsx from "clsx";
import Container from "../container";
import Link from "next/link";
import Button from "../ui/button";
import { CheckIcon } from "lucide-react";
import { useAuthStore } from "@/hooks/useAuthStore";

interface PlansProps {
  className?: string;
}

const Plans: React.FC<PlansProps> = ({ className }) => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <section
      id="pricing"
      className={clsx(
        "py-20 bg-gradient-to-tl from-[#d7d7d7] to-background border-t-[rgba(0,0,0,0.2)] border-[1px]",
        className
      )}
    >
      <Container className="flex flex-col items-center gap-20">
        <header className="w-full">
          <h2 className="font-bold text-3xl text-center" data-aos="fade-down">
            Our Plans
          </h2>
        </header>
        <div
          data-aos="flip-left"
          data-aos-delay="100"
          className="flex flex-col w-2/3 mx-auto items-center gap-10 bg-background rounded-md p-8 max-sm:w-[90%] max-[430px]:w-full"
        >
          <h3 className="font-bold text-2xl text-center">Monthly Plan</h3>
          <div className="text-center">
            <p className="text-lg">
              <span className="text-primary text-7xl font-black max-[430px]:text-5xl">
                $29
              </span>{" "}
              /month
            </p>
            <p className="text-neutral-400 mt-2 max-[430px]:text-sm">
              2-days trial available for $0.50
            </p>
          </div>
          <ul className="[&>li]:flex [&>li]:items-center [&>li]:gap-2 flex flex-col items-start gap-3 text-lg max-[430px]:text-base">
            <li>
              <CheckIcon size={30} /> Unlimited IQ Tests
            </li>
            <li>
              <CheckIcon size={30} /> Certificate with your result
            </li>
            <li>
              <CheckIcon size={30} /> 24/7 Support
            </li>
          </ul>
          <Button className="w-2/3 py-4 text-lg">
            <Link
              clasName="w-full h-full"
              href={
                user
                  ? !user.customerId
                    ? (`${process.env.NEXT_PUBLIC_STRIPE_TRIAL_LINK}?prefilled_email=${user.email}` as string)
                    : (`${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK}?prefilled_email=${user.email}` as string)
                  : "/login"
              }
            >
              Choose
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Plans;
