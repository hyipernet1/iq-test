import { subscriptionService } from "@/services/subscription.service";
import { useMutation } from "@tanstack/react-query";

export const useUnsubscribe = () => {
  return useMutation({
    mutationKey: ["unsubscribe"],
    mutationFn: async () => {
      const res = await subscriptionService.unsubscribe();
      if (!res?.data) return Promise.reject();
    },
  });
};
