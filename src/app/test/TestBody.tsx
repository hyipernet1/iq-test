"use client";

import clsx from "clsx";
import { useTest } from "./Test";
import Button from "@/components/ui/button";
import { useState } from "react";
import TestQuestions from "./TestQuestions";
import { useAuthStore } from "@/hooks/useAuthStore";
import { TIER } from "@/types/enums";
import Link from "next/link";
import Image from "next/image";
import { useGenerateUser, useRefresh } from "@/hooks/useAuth";
import Input from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useGetUsers } from "@/hooks/useUsers";
import toast from "react-hot-toast";
import Login from "../login/Login";

interface TestBodyProps {
  className?: string;
}

const TestBody: React.FC<TestBodyProps> = ({ className }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const { user } = useAuthStore();
  const { data: users } = useGetUsers();
  const { mutateAsync: refresh } = useRefresh();
  const { mutateAsync: generateUser } = useGenerateUser();
  const { register, handleSubmit } = useForm<{ email: string }>();

  const checkUser = (data: { email: string }) => {
    if (!user) {
      const userData = users?.find((user) => user.email === data.email);
      console.log(userData);
      if (userData) {
        setLoginFormVisible(true);
        toast.error("User with this email already exists. Please Log in.");
      } else generateUser({ email: data.email });
    }
  };

  const { currentQuestion, setCurrentQuestion, score, questionsQuantity } =
    useTest();

  return (
    <div className={clsx("py-10", className)}>
      {!isCompleted ? (
        currentQuestion === -1 ? (
          <div className="mx-auto text-center [&>p_span]:text-primary [&>p_span]:font-bold flex flex-col items-center gap-4">
            <h2 className="font-bold text-4xl text-center mb-8">IQ Test</h2>
            <p>
              <span>1 -</span> {questionsQuantity} Questions with increasing
              difficulty.
            </p>
            <p>
              <span>2 -</span> Observe the logical pattern.
            </p>
            <p>
              <span>3 -</span> Select the correct answer.
            </p>
            <span className="text-primary font-bold text-lg">Good Luck!</span>
            <Button onClick={() => setCurrentQuestion((prev) => (prev += 1))}>
              Start Test
            </Button>
          </div>
        ) : (
          <TestQuestions setIsCompleted={setIsCompleted} />
        )
      ) : (
        <div className="text-center flex flex-col items-center gap-5">
          <h2 className="text-primary font-bold text-5xl max-[450px]:text-4xl">
            Test Completed
          </h2>
          {!user ? (
            <>
              {loginFormVisible ? (
                <Login />
              ) : (
                <>
                  <h3 className="text-center mt-10 text-3xl inline-flex items-center gap-3">
                    Enter your email
                  </h3>
                  <form
                    className="flex flex-col items-center gap-5 mt-5 min-w-[400px] max-[420px]:min-w-[300px]"
                    onSubmit={handleSubmit(checkUser)}
                  >
                    <Input
                      required
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="123@gmail.com"
                      className="w-full"
                    />
                    <Button type="submit">Get Results</Button>
                  </form>
                </>
              )}
            </>
          ) : user?.tier === TIER.BASIC ? (
            <>
              <h3 className="text-center mt-20 text-3xl inline-flex items-center gap-3">
                One more detail
              </h3>
              <div className="flex flex-col items-start p-5 w-1/2 bg-white border-[1px] border-[rgba(0,0,0,.3)] rounded-xl max-lg:w-[80%] max-[500px]:w-[95%]">
                <div className="flex items-center justify-between w-full">
                  <p className="text-2xl">Total Due:</p>
                  <h4 className="text-primary font-bold text-3xl">$0.50</h4>
                </div>
                <div className="flex items-center justify-center gap-4 w-full">
                  <Image src="/visa.svg" alt="Visa" width={60} height={30} />
                  <Image
                    src="/mastercard.svg"
                    alt="Mastercard"
                    width={60}
                    height={30}
                  />
                </div>
                <Button className="w-2/3 py-4 text-lg mx-auto mt-6">
                  <Link
                    target={user ? "_blank" : "_self"}
                    href={
                      user
                        ? !user.customerId
                          ? (`${process.env.NEXT_PUBLIC_STRIPE_TRIAL_LINK}?prefilled_email=${user.email}` as string)
                          : (`${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK}?prefilled_email=${user.email}` as string)
                        : "/login"
                    }
                  >
                    Pay
                  </Link>
                </Button>
                <p className="text-neutral-500 text-center mt-3 text-xs w-full">
                  You can cancel at any time
                  <br />
                  Trial 2-days period, then $29/month
                </p>

                <div className="w-full flex mt-12 items-center mx-auto text-center justify-center gap-4">
                  <Button onClick={async () => refresh()}>Refresh</Button>
                  <p className="text-left">
                    Click here after payment, your test results will be
                    available
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center mt-20 text-3xl inline-flex items-center gap-3">
                Your IQ:{" "}
                <span className="text-6xl text-primary font-black">
                  {85 + (score / questionsQuantity) * 30}
                </span>
              </h3>
              <h3 className="text-center mt-8 text-2xl">
                Correct answers: {score >= 20 ? 20 : score} /{" "}
                {questionsQuantity}
              </h3>
              <Button
                onClick={async () => window.location.reload()}
                className="mt-5"
              >
                Try Again
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TestBody;
