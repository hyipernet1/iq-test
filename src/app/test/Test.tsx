'use client'

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react'
import TestBody from './TestBody'
import { questions } from './test.data'

export type TQuestion = {
	correct: number
	variantsImg: string[]
	questionImg: string
}

const TestContext = createContext<{
	questionsQuantity: number
	currentQuestion: number
	setCurrentQuestion: Dispatch<SetStateAction<number>>
	score: number
	setScore: (score: number) => void
	questions: TQuestion[]
	timeLeft: number
	setTimeLeft: Dispatch<SetStateAction<number>>
}>({} as any)

export const TIME_LIMIT = 30 * 60 // 30 minutes in seconds
export const useTest = () => useContext(TestContext)
export const questionsQuantity = questions.length

const Test: React.FC = () => {
	const [currentQuestion, setCurrentQuestion] = useState(-1)
	const [timeLeft, setTimeLeft] = useState(TIME_LIMIT) // 30 minutes in seconds
	const score = Number(sessionStorage.getItem('score') ?? '0')
	const setScore = (score: number) =>
		sessionStorage.setItem('score', String(score))

	useEffect(() => {
		sessionStorage.removeItem('score')

		if (currentQuestion === -1) {
			setTimeLeft(TIME_LIMIT)
		}
	}, [])

	return (
		<TestContext.Provider
			value={{
				questionsQuantity,
				currentQuestion,
				setCurrentQuestion,
				score,
				setScore,
				questions,
				timeLeft,
				setTimeLeft,
			}}
		>
			<TestBody />
		</TestContext.Provider>
	)
}

export default Test
