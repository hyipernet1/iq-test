"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useUnsubscribe } from "@/hooks/useSubscription";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UnsubscribeProps {
  className?: string;
}

const Unsubscribe: React.FC<UnsubscribeProps> = ({ className }) => {
  const [loadingToastId, setLoadingToastId] = useState("");
  const { handleSubmit } = useForm();
  const {
    mutateAsync: unsubscribe,
    isError,
    isSuccess,
    isPending,
  } = useUnsubscribe();

  useEffect(() => {
    if (isPending) {
      const loadingToastId = toast.loading("Unsubscribing...");
      setLoadingToastId(loadingToastId);
    }
    if (isSuccess) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
      toast.success("Your subscription was cancelled!");
    }
    if (isError) {
      loadingToastId && loadingToastId && toast.dismiss(loadingToastId);
    }
  }, [isPending, isSuccess, isError]);

  return (
    <div className={clsx(className)} data-aos="fade-down">
      <form
        className="bg-white px-4 rounded-md w-[60%] mx-auto py-14 max-sm:w-full"
        onSubmit={handleSubmit(() => unsubscribe())}
      >
        <h2 className="font-bold text-3xl text-center mb-8">
          Subscription cancellation request
        </h2>
        <div className="mt-6">
          <Button className="w-1/3 max-lg:w-2/3 max-[570px]:w-full mx-auto justify-center items-center gap-4 flex group border-2 hover:border-primary hover:bg-transparent hover:text-foreground">
            Unsubscribe
            <ArrowRightIcon
              className="group-hover:translate-x-full duration-300 transition-transform"
              size={30}
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Unsubscribe;
