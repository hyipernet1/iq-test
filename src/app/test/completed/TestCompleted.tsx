'use client'

import Login from '@/app/login/Login'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useGenerateUser, useRefresh } from '@/hooks/useAuth'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useGetUsers } from '@/hooks/useUsers'
import { TIER } from '@/types/enums'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { questionsQuantity } from '../Test'
import useSendEmail from '@/hooks/useSendEmail'

const TestCompleted: React.FC = ({}) => {
	const { handleSubmit, register } = useForm<{ email: string }>()

	const { mutateAsync: generateUser } = useGenerateUser()
	const { mutateAsync: sendEmail } = useSendEmail()
	const { data: users } = useGetUsers()
	const { user } = useAuthStore()
	const { push } = useRouter()
	const { mutateAsync: refresh } = useRefresh()
	const [loginFormVisible, setLoginFormVisible] = useState(false)

	const score = Number(sessionStorage.getItem('score') ?? '0')
	const iqScore = Math.round(80 + score * 3.3)

	const checkUser = (data: { email: string }) => {
		sendEmail({
			email: data.email,
			subject: 'Хтось завершив тест і ввів свою пошту',
			message: `Хтось завершив тест і ввів свою пошту: ${data.email}`,
			fullName: 'Не вказано',
		})
		if (!user) {
			const userData = users?.find(user => user.email === data.email)
			console.log(userData)
			if (userData) {
				setLoginFormVisible(true)
				toast.error('User with this email already exists. Please Log in.')
			} else generateUser({ email: data.email })
		}
	}

	return loginFormVisible ? (
		<div className='w-[500px] mx-auto max-[520px]:w-[300px]'>
			<Login callback={() => setLoginFormVisible(false)} />
		</div>
	) : (
		<div className='text-center mt-10 flex flex-col items-center gap-5'>
			<h2 className='text-primary font-bold text-5xl max-[450px]:text-4xl'>
				Test Completed
			</h2>
			{!user ? (
				<>
					<h3 className='text-center mt-10 text-3xl inline-flex items-center gap-3'>
						Enter your email
					</h3>
					<form
						className='flex flex-col items-center gap-5 mt-5 w-[400px] max-[420px]:w-[300px]'
						onSubmit={handleSubmit(checkUser)}
					>
						<Input
							required
							{...register('email', { required: true })}
							type='email'
							placeholder='123@gmail.com'
							className='w-full'
						/>
						<Button type='submit'>Get Results</Button>
					</form>
				</>
			) : user?.tier === TIER.BASIC ? (
				<>
					<h3 className='text-center mt-20 text-3xl inline-flex items-center gap-3'>
						One more detail
					</h3>
					<div className='flex flex-col items-start p-5 w-1/2 bg-white border-[1px] border-[rgba(0,0,0,.3)] rounded-xl max-lg:w-[80%] max-[500px]:w-[95%]'>
						<div className='flex items-center justify-between w-full'>
							<p className='text-2xl'>Total Due:</p>
							<h4 className='text-primary font-bold text-3xl'>$0.60</h4>
						</div>
						<div className='flex items-center justify-center gap-4 w-full'>
							<Image src='/visa.svg' alt='Visa' width={60} height={30} />
							<Image
								src='/mastercard.svg'
								alt='Mastercard'
								width={60}
								height={30}
							/>
						</div>
						<Button className='w-2/3 !p-0 text-lg mx-auto mt-6'>
							<Link
								className='w-full h-full py-4 px-6 block'
								href={
									user
										? !user.customerId
											? (`${process.env.NEXT_PUBLIC_STRIPE_TRIAL_LINK}?prefilled_email=${user.email}` as string)
											: (`${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK}?prefilled_email=${user.email}` as string)
										: '/login'
								}
							>
								Get my results
							</Link>
						</Button>
						<p className='text-base-500 text-center mt-3 text-xs w-full'>
							 Your Result Includes:

                                                     🎓 IQ Score Compared to Global Average

                                                     📊 Cognitive Strengths (Logic, Memory, Attention)

                                                     📄 Downloadable Certificate (PDF)

                                                     💬 Optional Professional Feedback
							<br />
							
						</p>

						<div className='w-full flex mt-12 items-center mx-auto text-center justify-center gap-4'>
							<Button onClick={async () => refresh()}>Refresh</Button>
							<p className='text-left'>
								Click here after payment, your test results will be available
							</p>
						</div>
					</div>
				</>
			) : (
				<>
					<h3 className='text-center mt-20 text-3xl inline-flex items-center gap-3'>
						Your IQ:{' '}
						<span className='text-6xl text-primary font-black'>{iqScore}</span>
					</h3>
					<h3 className='text-center mt-8 text-2xl'>
						Correct answers: {score >= 20 ? 20 : score} / {questionsQuantity}
					</h3>
					<Button onClick={async () => push('/test')} className='mt-5'>
						Try Again
					</Button>
				</>
			)}
		</div>
	)
}

export default TestCompleted
