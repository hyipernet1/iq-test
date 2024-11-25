"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  setScore: (score: number) => void;
  questions: TQuestion[];
}>({} as any);

export const useTest = () => useContext(TestContext);
export const questionsQuantity = questions.length;

const Test: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const score = Number(sessionStorage.getItem("score") ?? "0");
  const setScore = (score: number) =>
    sessionStorage.setItem("score", String(score));

  useEffect(() => sessionStorage.removeItem("score"), []);

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
