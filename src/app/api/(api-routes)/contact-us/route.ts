import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../exceptions/apiError";
import { handleApiError } from "../../exceptions/handleApiError";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, subject, message } = body;

    if (!fullName || !email || !subject || !message)
      throw new ApiError("Missing required fields", 400);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["hyipernet1@gmail.com"],
      subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
