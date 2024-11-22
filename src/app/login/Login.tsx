'use client';

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  const [loadingToastId, setLoadingToastId] = useState("");
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const { mutateAsync: login, isPending, isSuccess, isError } = useLogin();

  useEffect(() => {
    if (isPending) {
      const loadingToastId = toast.loading("Logging in...");
      setLoadingToastId(loadingToastId);
    }
    if (isSuccess) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
      toast.success("Login successful!");
    }
    if (isError) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
    }
  }, [isPending, isSuccess, isError]);

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
          <Button type="submit" className="w-full mt-2">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
