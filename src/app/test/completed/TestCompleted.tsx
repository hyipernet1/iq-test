'use client'

import Login from '@/app/login/Login'
import { useGenerateUser, useRefresh } from '@/hooks/useAuth'
import { useAuthStore } from '@/hooks/useAuthStore'
import useSendEmail from '@/hooks/useSendEmail'
import { useGetUsers } from '@/hooks/useUsers'
import { TIER } from '@/types/enums'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { questionsQuantity } from '../Test'
import { EmailFormSection } from './components/EmailFormSection'
import { FamousPeopleSection } from './components/FamousPeopleSection'
import { PaymentSection } from './components/PaymentSection'
import { ReasonsSection } from './components/ReasonsSection'
import { ResultSection } from './components/ResultSection'
import { StatsSection } from './components/StatsSection'
import { TestimonialsSection } from './components/TestimonialsSection'

const testimonials = [
	{
		name: 'Anna Müller',
		comment:
			'I needed help and contacted customer service... EXCELLENT!!! Great listening skills and competence. Problem solved in a few emails. Attentive advisor who solved my problem (probably caused by my inattention) in a few seconds.',
		rating: 5,
	},
	{
		name: 'Pierre Dubois',
		comment:
			'The customer support team was extremely understanding and helpful. I appreciate their support and highly recommend their platform for both their services and their exceptional customer service.',
		rating: 5,
	},
]

const famousPeople = [
	{ name: 'Elon Musk', iq: 158 },
	{ name: 'Donald Trump', iq: 156 },
	{ name: 'Bill Gates', iq: 160 },
	{ name: 'YOU', iq: '?' },
]

const whyList = [
	{
		title: 'Based on Psychological Studies',
		text: 'Our tests are based on methods used in psychological studies, ensuring accurate and dependable results.',
	},
	{
		title: 'Built on Cognitive Science',
		text: 'Your report highlights your strengths and areas for growth using proven cognitive science principles, helping you to learn new skills faster.',
	},
	{
		title: 'Designed by Neuroscientists',
		text: 'Gain anytime access to a library of neuroscience-backed games to improve memory, focus, and problem-solving skills.',
	},
	{
		title: 'Trusted by Thousands Globally',
		text: 'IQ Test is relied on by people globally for accurate insights that support better decision-making and build confidence.',
	},
]

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

	if (loginFormVisible) {
		return (
			<div className='w-[500px] mx-auto max-[520px]:w-[300px]'>
				<Login callback={() => setLoginFormVisible(false)} />
			</div>
		)
	}

	return (
		<>
			<div className='w-full flex flex-col items-center justify-center mt-6 mb-2'>
				<h1 className='text-4xl max-sm:text-2xl font-extrabold text-center leading-tight'>
					<span className='text-primary'>Discover</span> Where You Stand Among{' '}
					<span className='text-primary'>Others</span>
				</h1>
				<p className='text-lg text-gray-500 mt-2 text-center max-w-xl'>
					See how your IQ compares to world-famous minds and get your
					personalized results instantly.
				</p>
			</div>
			<FamousPeopleSection />
			<div className='mt-10 grid grid-cols-[1.2fr_2fr] gap-10 max-lg:grid-cols-1 max-w-6xl mx-auto px-4 w-full'>
				<div className='flex flex-col gap-8 items-stretch'>
					<ReasonsSection />
					<StatsSection />
					<TestimonialsSection testimonials={testimonials} />
				</div>
				<div className='flex flex-col items-center justify-center min-h-[400px] gap-8 bg-white/70 rounded-2xl p-4 shadow-lg w-full'>
					{!user ? (
						<EmailFormSection
							handleSubmit={handleSubmit}
							checkUser={checkUser}
							register={register}
						/>
					) : user?.tier === TIER.BASIC ? (
						<PaymentSection user={user} refresh={refresh} />
					) : (
						<ResultSection
							iqScore={iqScore}
							score={score}
							questionsQuantity={questionsQuantity}
							push={push}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default TestCompleted
