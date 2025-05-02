import Button from '@/components/ui/button'

export const ResultSection = ({ iqScore, score, questionsQuantity, push }: any) => (
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
)