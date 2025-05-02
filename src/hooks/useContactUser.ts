import { emailService } from '@/services/email.service'
import { useMutation } from '@tanstack/react-query'

export function useContactUser() {
	return useMutation({
		mutationFn: async ({
			email,
			score,
		}: {
			email: string
			score: number
		}) => {
			const res = await emailService.contactUser({ email, score })
			return res.data
		},
	})
}
