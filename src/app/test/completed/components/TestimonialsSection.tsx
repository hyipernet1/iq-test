import { Testimonial } from './Testimonial'

export const TestimonialsSection = ({
	testimonials,
}: {
	testimonials: any[]
}) => (
	<div className='flex flex-col gap-4 w-full'>
		{testimonials.map((t, i) => (
			<Testimonial key={i} {...t} />
		))}
	</div>
)
