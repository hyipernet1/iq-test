import { authService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./useAuthStore";
import { removeAccessToken, setAccessToken } from "@/services/auth/auth.helper";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],

    mutationFn: async (data: { email: string; password: string }) => {
      const res = await authService.login(data);
      if (!res?.data) return Promise.reject();
      useAuthStore.setState({ user: res.data.user });
      console.log(res.data)
      setAccessToken(res.data.accessToken);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],

    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const res = await authService.register(data);
      if (!res?.data) return Promise.reject();
      useAuthStore.setState({ user: res.data.user });
      setAccessToken(res.data.accessToken);
    },
  });
}
export function useLogout() {
  return useMutation({
    mutationKey: ["logout"],

    mutationFn: async () => {
      await authService.logout();
      useAuthStore.setState({ user: null });
      removeAccessToken();
    },
  });
}
export function useRefresh() {
  return useMutation({
    mutationKey: ["refresh"],

    mutationFn: async () => {
      const res = await authService.refresh();
      if (!res?.data) return Promise.reject();
      useAuthStore.setState({ user: res.data.user });
      setAccessToken(res.data.accessToken);
    },
  });
}
