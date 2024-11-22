import { TOKEN } from "@/types/enums";
import Cookies from "js-cookie";

// Access Token
export const setAccessToken = (accessToken: string) =>
  Cookies.set(TOKEN.ACCESS_TOKEN, accessToken);
export const getAccessToken = () => Cookies.get(TOKEN.ACCESS_TOKEN);
export const removeAccessToken = () => Cookies.remove(TOKEN.ACCESS_TOKEN);