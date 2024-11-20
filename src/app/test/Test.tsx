"use client";

import clsx from "clsx";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import TestBody from "./TestBody";

interface TestProps {
  className?: string;
}

type TQuestion = {
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

const Test: React.FC<TestProps> = ({ className }) => {
  const questions: TQuestion[] = [
    {
      correct: 4,
      variantsImg: [
        "/questions/1/variants/1.png",
        "/questions/1/variants/2.png",
        "/questions/1/variants/3.png",
        "/questions/1/variants/4.png",
      ],
      questionImg: "/questions/1/img.webp",
    },
    {
      correct: 4,
      variantsImg: [
        "/questions/1/variants/1.png",
        "/questions/1/variants/2.png",
        "/questions/1/variants/3.png",
        "/questions/1/variants/4.png",
      ],
      questionImg: "/questions/1/img.webp",
    },
  ];

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
      <div className={clsx(className)}>
        <TestBody />
      </div>
    </TestContext.Provider>
  );
};

export default Test;
