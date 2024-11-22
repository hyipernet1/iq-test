import bcrypt from "bcrypt";
import { prisma } from "@/prisma-client";
import { TOKEN } from "@/types/enums";
import { NextResponse } from "next/server";
import { UserDto } from "../../../dtos/userDto";
import { tokenService } from "../tokens";
import { ApiError } from "../../../exceptions/apiError";
import { handleApiError } from "../../../exceptions/handleApiError";

export const POST = async (req: Request) => {
  try {
    // get body
    const body = await req.json();
    const { email, password } = body;

    // register
    const userData = await login({ email, password });

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

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError("User not found", 400);

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ApiError("Password is incorrect", 400);

  // create tokens
  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  // Return
  return {
    ...tokens,
    user: userDto,
  };
};
