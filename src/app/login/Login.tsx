"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const { mutateAsync: login, isSuccess, isPending } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
    }
  }, [isSuccess]);

  return (
    <div className={clsx(className)} data-aos="fade-right">
      <form
        className="bg-white px-4 rounded-md w-full mx-auto py-8"
        onSubmit={handleSubmit((data) => login(data))}
      >
        <h2 className="font-bold text-4xl text-center mb-8">Login</h2>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full"
          {...register("email", { required: true })}
          required
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mt-6"
          {...register("password", { required: true })}
          required
        />
        <div className="mt-16">
          <p className="max-[500px]:text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold">
              Register
            </Link>
          </p>
          <Button type="submit" className="w-full mt-2 flex items-center gap-5 text-center justify-center" disabled={isPending}>
            Log In{" "}
            <LoaderIcon
              className={clsx("animate-spin", !isPending && "hidden")}
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
