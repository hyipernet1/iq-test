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

export const ReasonsSection = () => (
	<div className='w-full bg-white/90 rounded-xl p-6 border border-gray-200 shadow flex flex-col gap-4'>
		<h3 className='text-2xl font-bold text-primary mb-3'>
			Reasons Why You Can Trust Our{' '}
			<span className='text-primary'>IQ Test</span>
		</h3>
		<ul className='flex flex-col gap-4'>
			{whyList.map((item, i) => (
				<li key={i} className='flex items-start gap-3'>
					<span className='mt-1'>
						<svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
							<circle cx='12' cy='12' r='12' fill='#46656f ' />
							<path
								d='M8 12.5l2.5 2.5L16 9'
								stroke='#fff'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</span>
					<div>
						<div className='font-semibold text-base text-gray-900'>
							{item.title}
						</div>
						<div className='text-gray-600 text-sm'>{item.text}</div>
					</div>
				</li>
			))}
		</ul>
	</div>
)
