import { prisma } from "@/prisma-client";
import bcrypt from "bcrypt";
import { tokenService } from "../tokens";
import { UserDto } from "../../../dtos/userDto";
import { NextResponse } from "next/server";
import { TOKEN } from "@/types/enums";
import { handleApiError } from "../../../exceptions/handleApiError";
import { ApiError } from "../../../exceptions/apiError";

export const POST = async (req: Request) => {
  try {
    // get body
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    // register
    const userData = await register({ email, password, firstName, lastName });

    // response
    const res = NextResponse.json(userData, { status: 201 });
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
    return handleApiError(e)
  }
};

const register = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  // check if user already exists
  const candidate = await prisma.user.findUnique({ where: { email } });
  if (candidate) throw new ApiError("User already exists", 400);

  // hash password
  const hashPassword = await bcrypt.hash(password, 3);

  // create user
  const user = await prisma.user.create({
    data: { email, password: hashPassword, firstName, lastName },
  });

  // create tokens
  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });

  // save refresh token
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};
