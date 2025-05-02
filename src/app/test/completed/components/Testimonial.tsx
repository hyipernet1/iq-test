import Image from 'next/image'

interface Props {
	name: string
	comment: string
	rating: number
}

export const Testimonial = ({ name, comment, rating }: Props) => (
	<article className='bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start shadow-sm'>
		<span className='rounded-full bg-slate-200 flex items-center justify-center w-12 h-12'>
			<svg width='32' height='32' fill='none' viewBox='0 0 24 24'>
				<circle cx='12' cy='8' r='4' fill='#cbd5e1' />
				<path d='M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4' fill='#cbd5e1' />
			</svg>
		</span>
		<div className='flex-1 text-left'>
			<div className='flex items-center gap-2 mb-1'>
				<span className='font-semibold'>{name}</span>
				<span className='bg-gray-100 max-sm:hidden text-gray-600 text-xs px-2 py-0.5 rounded'>
					IQ Test Online User
				</span>
				<span className='flex ml-2'>
					{[...Array(rating)].map((_, i) => (
						<svg key={i} width='18' height='18' fill='none' viewBox='0 0 24 24'>
							<path
								d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
								fill='#22c55e'
							/>
						</svg>
					))}
				</span>
			</div>
			<div className='text-gray-700 text-sm'>{comment}</div>
		</div>
	</article>
)
