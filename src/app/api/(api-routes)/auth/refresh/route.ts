import { TOKEN } from "@/types/enums";
import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "../tokens";
import { UserDto } from "../../../dtos/userDto";
import { prisma } from "@/prisma-client";
import { ApiError } from "../../../exceptions/apiError";
import { handleApiError } from "@/app/api/exceptions/handleApiError";

export const POST = async (req: NextRequest) => {
  try {
    // get token
    const token = req.cookies.get(TOKEN.REFRESH_TOKEN);
    if (!token) throw new ApiError("You are not logged in", 401);

    // refresh
    const userData = await refresh(token.value);

    // response
    const res = NextResponse.json(userData, { status: 200 });
    res.cookies.set({
      name: TOKEN.REFRESH_TOKEN,
      value: userData.refreshToken,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    return handleApiError(e);
  }
};

const refresh = async (token: string) => {
  const userData = tokenService.validateRefreshToken(token) as any;

  const tokenFromDb = await tokenService.findToken(token);
  if (!userData || !tokenFromDb)
    throw new ApiError("You are not logged in", 401);

  const userDto = new UserDto(userData as any);
  const tokens = tokenService.generateToken({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};
