import { axiosWithAuth } from "@/app/api/axios.instance";

export const subscriptionService = {
  async unsubscribe() {
    {
      return await axiosWithAuth.post<{ ok: boolean }>("/stripe/unsubscribe");
    }
  },
};
