import { emailService } from "@/services/email.service";
import { useMutation } from "@tanstack/react-query";

export default function useSendEmail() {
  return useMutation({
    mutationKey: ["send email"],

    mutationFn: async (data: {
      email: string;
      subject: string;
      message: string;
      fullName: string;
    }) => {
        const res = await emailService.contactUs(data);
        if (!res?.data) return Promise.reject();
    },
  });
}
