import { prisma } from "@/prisma-client";
import bcrypt from "bcrypt";
import { tokenService } from "../tokens";
import { UserDto } from "../../../dtos/userDto";
import { NextResponse } from "next/server";
import { TOKEN } from "@/types/enums";
import { handleApiError } from "../../../exceptions/handleApiError";
import { ApiError } from "../../../exceptions/apiError";
import { Resend } from "resend";

export const POST = async (req: Request) => {
  try {
    // get body
    const body = await req.json();
    const { email } = body;

    // register
    const userData = await generateUser({ email });

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
    return handleApiError(e);
  }
};

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const generateUser = async ({ email }: { email: string }) => {
  // check if user already exists
  const candidate = await prisma.user.findUnique({ where: { email } });
  if (candidate) throw new ApiError("User already exists", 400);

  // hash password
  const password = generatePassword();
  const hashPassword = await bcrypt.hash(password, 3);

  // create user
  const user = await prisma.user.create({
    data: { email, password: hashPassword },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Creating Account in IQ Logic",
    html: `<p>You are creating account. <br /><br /> Your Email: ${email} <br/> Your Password: ${password} <br /><br /> Please, save it. We can not recover it!</p>`,
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
