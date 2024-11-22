import { axiosWithoutAuth } from "@/app/api/axios.instance";

export const emailService = {
  async contactUs({
    fullName,
    email,
    subject,
    message,
  }: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    {
      return await axiosWithoutAuth.post<{ ok: boolean }>("/contact-us", {
        fullName,
        email,
        subject,
        message,
      });
    }
  },
};
