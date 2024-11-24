import { axiosWithoutAuth } from "@/app/api/axios.instance";
import { UserDto } from "@/app/api/dtos/userDto";
import { AxiosResponse } from "axios";

export const userService = {
  async getUsers() {
    return (await axiosWithoutAuth.get<UserDto[]>("/users/all"))
      .data;
  },
};
