import {
  axiosWithoutAuth,
  axiosWithoutAuthAndErrors,
} from "@/app/api/axios.instance";

export const authService = {
  async login({ email, password }: { email: string; password: string }) {
    return await axiosWithoutAuth.post("/auth/login", { email, password });
  },
  async register({ email, password }: { email: string; password: string }) {
    return await axiosWithoutAuth.post("/auth/register", {
      email,
      password,
    });
  },

  async generateUser({ email }: { email: string }) {
    return await axiosWithoutAuth.post("/auth/generate-user", { email });
  },

  async logout() {
    try {
      return await axiosWithoutAuthAndErrors.post("/auth/logout");
    } catch {}
  },

  async refresh() {
    return await axiosWithoutAuthAndErrors.post("/auth/refresh");
  },
};
