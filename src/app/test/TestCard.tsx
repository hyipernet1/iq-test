'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { useTest } from './Test'

interface TestCardProps {
	className?: string
	setIsCompleted: Dispatch<SetStateAction<boolean>>
}

const TestCard: React.FC<TestCardProps> = ({ className, setIsCompleted }) => {
	const {
		currentQuestion,
		questionsQuantity,
		score,
		questions,
		setCurrentQuestion,
		setScore,
	} = useTest()

	const getDelayClass = (index: number) => {
		switch (index) {
			case 0:
				return ''
			case 1:
				return 'delay-100'
			case 2:
				return 'delay-200'
			case 3:
				return 'delay-300'
			case 4:
				return 'delay-400'
			case 5:
				return 'delay-500'
			default:
				return ''
		}
	}

	return (
		<div
			className={clsx(
				'h-[450px] w-full grid grid-cols-2 max-w-[1200px] mx-auto my-14 max-[1200px]:grid-cols-1 max-[1200px]:h-full max-[1200px]:w-[600px] max-sm:w-[90%]',
				className
			)}
		>
			<div className='relative h-[450px] max-sm:h-[300px] max-sm:w-2/3 max-sm:mx-auto max-[500px]:w-full'>
				<Image
					src={questions[currentQuestion].questionImg}
					alt={`Question ${currentQuestion}`}
					fill
					sizes='100%, 100%'
				/>
			</div>
			<div className='w-[90%] ml-auto h-full flex flex-col items-center text-center justify-between gap-10 max-[1200px]:w-full max-[1200px]:m-[60px_auto_0_auto]'>
				<h2 className='text-primary text-lg font-bold '>
					Select the most logical answer:
				</h2>
				<div className='grid grid-cols-3 gap-4 w-full h-full max-[1200px]:min-h-96 max-sm:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:min-h-[900px]'>
					{questions[currentQuestion].variantsImg.map((option, index) => (
						<div
							key={index}
							onClick={() => {
								if (questions[currentQuestion].correct === index + 1) {
									setScore(score + 1)
								}
								if (currentQuestion === questionsQuantity - 1) {
									toast.loading('Counting Results', {
										duration: 2000,
									})
									setTimeout(() => setIsCompleted(true), 2500)
								} else {
									setCurrentQuestion(prev => (prev += 1))
								}
							}}
							className={`bounce-left ${getDelayClass(
								index
							)} flex flex-col items-center text-center gap-2 py-3 cursor-pointer rounded-lg bg-slate-200 border-b-2 border-primary`}
						>
							<p className='text-lg font-bold text-primary'>{index + 1}</p>
							<div className='flex items-center h-24 w-24 justify-center cursor-pointer relative'>
								<Image
									src={option}
									alt={`Option ${index + 1}`}
									fill
									sizes='100%, 100%'
									className='object-contain'
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default TestCard
