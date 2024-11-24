import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["get all users"],
    queryFn: async () => {
      const res = await userService.getUsers();
      if (!res) return Promise.reject();
      return res;
    },
    staleTime: Infinity,
  });
};
