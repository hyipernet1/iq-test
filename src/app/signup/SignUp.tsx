"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRegister } from "@/hooks/useAuth";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignUpProps {
  className?: string;
}

const SignUp: React.FC<SignUpProps> = ({ className }) => {
  const [loadingToastId, setLoadingToastId] = useState("");

  const { mutateAsync: signup, isPending, isSuccess, isError } = useRegister();

  const { register, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }>();

  useEffect(() => {
    if (isPending) {
      const loadingToastId = toast.loading("Signing up...");
      setLoadingToastId(loadingToastId);
    }
    if (isSuccess) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
      toast.success("Sign up successful!");
    }
    if (isError) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
    }
  }, [isPending, isSuccess, isError]);

  return (
    <div className={clsx(className)} data-aos="fade-right">
      <form
        className="bg-white px-4 rounded-md w-full mx-auto py-8"
        onSubmit={handleSubmit((data) => {
          if (data.password === data.passwordConfirmation) {
            signup(data);
          } else {
            toast.error("Passwords do not match!");
          }
        })}
      >
        <h2 className="font-bold text-4xl text-center mb-8">Sign up</h2>
        <div className="grid grid-cols-2 w-full gap-5 max-[500px]:grid-cols-1">
          <Input
            type="text"
            className="w-full"
            placeholder="First Name"
            required
            {...register("firstName", { required: true })}
          />
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full"
            required
            {...register("lastName", { required: true })}
          />
        </div>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full mt-6"
          required
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mt-6"
          required
          {...register("password", { required: true })}
        />
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Password confirmation"
          className="w-full mt-6"
          required
          {...register("passwordConfirmation", { required: true })}
        />
        <div className="mt-6">
          <p className="max-[500px]:text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
