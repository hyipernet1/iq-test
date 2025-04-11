import Faq from '@/components/home/faq'
import Hero from '@/components/home/hero'
import Plans from '@/components/home/plans'
import { IPhonePromo } from '@/components/home/iphone-promo'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'My IQ Rank',
}

export default function Home() {
	return (
		<section>
			<Hero />
			<IPhonePromo />
			<Faq />
			<Plans />
		</section>
	)
}
