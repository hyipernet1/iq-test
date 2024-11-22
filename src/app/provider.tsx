"use client";

import { PropsWithChildren, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/services/auth/auth.helper";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/hooks/useAuthStore";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      offset: 200,
    });

    const checkAuth = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          const data = (await authService.refresh()).data;
          if (data) {
            useAuthStore.setState({ user: data.user });
            setAccessToken(data.accessToken);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (e) {
          await authService.logout();
          useAuthStore.setState({ user: null });
          removeAccessToken();
        }
      }
    };

    checkAuth();
  }, []);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
