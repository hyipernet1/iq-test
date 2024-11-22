import { TOKEN } from "@/types/enums";
import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "../tokens";
import { ApiError } from "../../../exceptions/apiError";
import { handleApiError } from "@/app/api/exceptions/handleApiError";

export const POST = async (req: NextRequest) => {
  try {
    // get token
    const token = req.cookies.get(TOKEN.REFRESH_TOKEN);
    if (!token) throw new ApiError("You are not logged in", 401);

    // logout
    const deletedToken = await logout(token.value);

    // response
    const res = NextResponse.json({ ok: true, token: deletedToken.token }, { status: 200 });
    res.cookies.delete(TOKEN.REFRESH_TOKEN);

    return res;
  } catch (e) {
    return handleApiError(e);
  }
};

const logout = async (token: string) => {
    return tokenService.removeToken(token)    
}
