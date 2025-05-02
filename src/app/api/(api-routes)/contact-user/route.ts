import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '../../exceptions/apiError'
import { handleApiError } from '../../exceptions/handleApiError'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { email, score } = body

		if (!email || !score) throw new ApiError('Missing required fields', 400)

		const resend = new Resend(process.env.RESEND_API_KEY)

		await resend.emails.send({
			from: 'My IQ Rank <onboarding@myiqrank.com>',
			to: [email],
			subject: 'Completing IQ Test',
			html: `<p>You have completed the IQ test. <br /><br /> Your score: ${score} <br />`,
		})

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
