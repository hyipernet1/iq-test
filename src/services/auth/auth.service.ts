import {
  axiosWithoutAuth,
  axiosWithoutAuthAndErrors,
} from "@/app/api/axios.instance";

export const authService = {
  async login({ email, password }: { email: string; password: string }) {
    return await axiosWithoutAuth.post("/auth/login", { email, password });
  },
  async register({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return await axiosWithoutAuth.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
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
