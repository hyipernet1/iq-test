"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import useSendEmail from "@/hooks/useSendEmail";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ContactUsProps {
  className?: string;
}

const ContactUs: React.FC<ContactUsProps> = ({ className }) => {
  const [loadingToastId, setLoadingToastId] = useState("");

  const { register, handleSubmit } = useForm<{
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }>();

  const {
    mutateAsync: sendEmail,
    isPending,
    isSuccess,
    isError,
  } = useSendEmail();

  useEffect(() => {
    if (isPending) {
      const loadingToastId = toast.loading("Sending email...");
      setLoadingToastId(loadingToastId);
    }
    if (isSuccess) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
      toast.success("Email sent successfully!");
    }
    if (isError) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
    }
  }, [isPending, isSuccess, isError]);

  return (
    <div className={clsx(className)} data-aos="fade-right">
      <form
        className="bg-white px-4 rounded-md w-full mx-auto py-8"
        onSubmit={handleSubmit((data) => sendEmail(data))}
      >
        <h2 className="font-bold text-4xl text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-2 w-full gap-5 max-[500px]:grid-cols-1">
          <Input
            type="text"
            className="w-full"
            placeholder="Full name"
            required
            {...register("fullName", {required: true})}
          />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full"
            required
            {...register("email", {required: true})}
          />
        </div>
        <Input
          type="text"
          id="subject"
          placeholder="Subject"
          className="w-full mt-6"
          required
          {...register("subject", {required: true})}
        />
        <Textarea
          id="message"
          placeholder="Your message"
          required
          className="w-full mt-6 max-h-[200px]"
          {...register("message", {required: true})}
        />
        <div className="mt-6">
          <Button type="submit" className="w-full mt-2">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
