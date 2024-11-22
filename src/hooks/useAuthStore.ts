import { UserDto } from "@/app/api/dtos/userDto";
import { create } from "zustand";

interface State {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
}

export const useAuthStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
