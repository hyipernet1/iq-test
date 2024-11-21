"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import TestBody from "./TestBody";
import { questions } from "./test.data";

export type TQuestion = {
  correct: number;
  variantsImg: string[];
  questionImg: string;
};

const TestContext = createContext<{
  questionsQuantity: number;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  questions: TQuestion[];
}>({} as any);

export const useTest = () => useContext(TestContext);

const Test: React.FC = () => {
  const [questionsQuantity] = useState(questions.length);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [score, setScore] = useState(0);

  return (
    <TestContext.Provider
      value={{
        questionsQuantity,
        currentQuestion,
        setCurrentQuestion,
        score,
        setScore,
        questions,
      }}
    >
      <TestBody />
    </TestContext.Provider>
  );
};

export default Test;
