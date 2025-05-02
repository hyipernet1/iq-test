import Image from 'next/image'

const famousPeople: { name: string; iq: number; img: string }[] = [
	{ name: 'Elon Musk', iq: 158, img: '/elon-musk.jpg' },
	{ name: 'Donald Trump', iq: 156, img: '/trump.jpg' },
	{ name: 'Bill Gates', iq: 160, img: '/bill-gates.jpg' },
	{ name: 'YOU', iq: 0, img: '' },
]

export const FamousPeopleSection = () => (
	<div className='flex items-center justify-center gap-8 bg-white/80 py-4 rounded-xl shadow mb-6 max-w-5xl mx-auto w-full flex-wrap'>
		{famousPeople
			.sort((a, b) => (a.iq === 0 ? 1 : b.iq === 0 ? -1 : a.iq - b.iq))
			.map((p, i) => (
				<div key={i} className='flex flex-col items-center gap-1 w-24'>
					{p.img ? (
						<Image
							src={p.img}
							alt={p.name}
							className='rounded-full w-14 h-14 object-cover mb-1'
							width={56}
							height={56}
						/>
					) : (
						<span className='rounded-full bg-slate-200 flex items-center justify-center w-14 h-14 mb-1'>
							<svg width='36' height='36' fill='none' viewBox='0 0 24 24'>
								<circle cx='12' cy='8' r='6' fill='#cbd5e1' />
								<path d='M4 22c0-3.31 4.03-6 8-6s8 2.69 8 6' fill='#cbd5e1' />
							</svg>
						</span>
					)}
					<span className='text-primary font-bold text-lg'>
						IQ {p.iq === 0 ? '?' : p.iq}
					</span>
					<span className='text-xs text-gray-700 font-medium text-center'>
						{p.name}
					</span>
				</div>
			))}
	</div>
)
