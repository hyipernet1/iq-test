'use client'

import Button from '@/components/ui/button'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTest } from './Test'
import TestQuestions from './TestQuestions'

interface TestBodyProps {
	className?: string
}

const TestBody: React.FC<TestBodyProps> = ({ className }) => {
	const [isCompleted, setIsCompleted] = useState(false)
	const { push } = useRouter()
	const { currentQuestion, setCurrentQuestion, questionsQuantity } = useTest()

	useEffect(() => {
		if (isCompleted) push('/test/completed')
	}, [isCompleted])

	return (
		<div className={clsx('py-10', className)}>
			{!isCompleted &&
				(currentQuestion === -1 ? (
					<div className='mx-auto px-4 max-w-4xl text-center flex flex-col items-center gap-6'>
						<h2 className='font-bold text-4xl text-center mb-4'>IQ Test</h2>
						<div className='bg-white p-6 rounded-lg shadow-md w-full text-left mb-6'>
							<h3 className='text-xl font-semibold text-primary mb-4 text-center'>
								Test Instructions
							</h3>
							<ul className='space-y-3 mb-6'>
								<li className='flex items-start'>
									<span className='text-primary font-bold mr-2'>•</span>
									<span>
										This test consists of{' '}
										<strong>{questionsQuantity} questions</strong> that will
										measure your cognitive abilities.
									</span>
								</li>
								<li className='flex items-start'>
									<span className='text-primary font-bold mr-2'>•</span>
									<span>
										For each question, you'll see a logical pattern or sequence,
										and you need to identify the missing element.
									</span>
								</li>
								<li className='flex items-start'>
									<span className='text-primary font-bold mr-2'>•</span>
									<span>
										You'll have <strong>20 minutes</strong> to complete the
										entire test. Try to answer all questions.
									</span>
								</li>
								<li className='flex items-start'>
									<span className='text-primary font-bold mr-2'>•</span>
									<span>
										Each question has 6 possible answers. Select the one that
										best completes the pattern.
									</span>
								</li>
								<li className='flex items-start'>
									<span className='text-primary font-bold mr-2'>•</span>
									<span>
										Don't spend too much time on any single question. If you're
										stuck, make your best guess and move on.
									</span>
								</li>
							</ul>
							<div className='bg-gray-100 p-4 rounded-md'>
								<h4 className='font-semibold mb-2'>Tips for success:</h4>
								<ul className='space-y-2'>
									<li className='flex items-start'>
										<span className='text-primary font-bold mr-2'>✓</span>
										<span>
											Look for patterns in shapes, sizes, positions, and colors.
										</span>
									</li>
									<li className='flex items-start'>
										<span className='text-primary font-bold mr-2'>✓</span>
										<span>
											Consider both horizontal and vertical relationships
											between elements.
										</span>
									</li>
									<li className='flex items-start'>
										<span className='text-primary font-bold mr-2'>✓</span>
										<span>
											Trust your instincts—your first impression is often
											correct.
										</span>
									</li>
								</ul>
							</div>
						</div>
						<div className='text-center mb-6'>
							<p className='text-lg'>Ready to discover your IQ level?</p>
							<p className='text-primary font-bold text-xl mt-2'>Good luck!</p>
						</div>
						<Button
							onClick={() => setCurrentQuestion(prev => (prev += 1))}
							className='px-10 py-3 text-lg'
						>
							Start Test Now
						</Button>
					</div>
				) : (
					<TestQuestions setIsCompleted={setIsCompleted} />
				))}
		</div>
	)
}

export default TestBody
