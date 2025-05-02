import Link from 'next/link'

import Button from '@/components/ui/button'
import Image from 'next/image'

export const PaymentSection = ({ user, refresh }: any) => (
	<>
		<div className='bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center max-w-2xl mx-auto mt-10 shadow-md'>
			<h3 className='text-3xl font-semibold flex items-center justify-center gap-2 mb-4'>
				🎁 Subscription = A Chance to Win an iPhone 15!
			</h3>
			<p className='text-lg mb-2'>
				Subscribe today and you'll be automatically entered into our iPhone 15
				giveaway 📱
			</p>
			<ul className='text-left text-base list-disc list-inside mb-4 space-y-1'>
				<li>📆 Winner announced on May 1st</li>
				<li>🎯 Only paid subscribers are eligible</li>
				<li>💡 More subscriptions = more chances to win</li>
			</ul>
			<p className='text-lg font-medium'>
				👉 Click below to subscribe and secure your chance to win!
			</p>
		</div>

		<div className='flex flex-col items-start p-5 w-full bg-white border-[1px] border-[rgba(0,0,0,.3)] rounded-xl max-lg:w-[80%] max-[500px]:w-[95%] mt-6'>
			<div className='flex items-center justify-between w-full'>
				<p className='text-2xl'>Total Due:</p>
				<h4 className='text-primary font-bold text-3xl'>$0.60</h4>
			</div>
			<div className='flex items-center justify-center gap-4 w-full'>
				<Image src='/visa.svg' alt='Visa' width={60} height={30} />
				<Image src='/mastercard.svg' alt='Mastercard' width={60} height={30} />
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

			<div className='flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 mt-6 w-full max-sm:flex-col'>
				<svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
					<path
						d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z'
						fill='#46656f'
					/>
				</svg>
				<span className='font-medium text-gray-700'>Payments 100% safe</span>
				<span className='ml-auto flex gap-2 max-sm:mr-auto'>
					<Image src='/visa.svg' alt='Visa' width={32} height={18} />
					<Image
						src='/mastercard.svg'
						alt='Mastercard'
						width={32}
						height={18}
					/>
				</span>
			</div>
			<div className='text-xs text-gray-500 mt-2 w-full text-left'>
				All transactions are secure and encrypted. Credit card information is
				not stored.
			</div>

			<div className='text-[11px] text-gray-400 mt-6 w-full text-left'>
				Our intelligence test is offered exceptionally at a price of $0.60 per
				48-hour trial. After the trial period ends and you do not cancel, our
				offer will be automatically renewed as a subscription without obligation
				at a price of $29.90 per month. You can cancel at any time. See{' '}
				<Link href='/terms' className='underline'>
					terms and conditions
				</Link>{' '}
				for more details.
			</div>
		</div>
		<div className='w-full flex mt-8 items-center mx-auto text-center justify-center gap-4'>
			<Button onClick={async () => refresh()}>Refresh</Button>
			<p className='text-left'>
				Click here after payment, your test results will be available
			</p>
		</div>
	</>
)
