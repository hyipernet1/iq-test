"use client";

import clsx from "clsx";
import { useTest } from "./Test";
import Button from "@/components/ui/button";
import { useState } from "react";
import TestQuestions from "./TestQuestions";

interface TestBodyProps {
  className?: string;
}

const TestBody: React.FC<TestBodyProps> = ({ className }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const { currentQuestion, setCurrentQuestion, score, questionsQuantity } =
    useTest();

  return (
    <div className={clsx("py-10", className)}>
      {!isCompleted ? (
        currentQuestion === -1 ? (
          <div className="mx-auto text-center [&>p_span]:text-primary [&>p_span]:font-bold flex flex-col items-center gap-4">
            <h2 className="font-bold text-4xl text-center mb-8">IQ Test</h2>
            <p>
              <span>1 -</span> {questionsQuantity} Questions with increasing
              difficulty.
            </p>
            <p>
              <span>2 -</span> Observe the logical pattern.
            </p>
            <p>
              <span>3 -</span> Select the correct answer.
            </p>
            <span className="text-primary font-bold text-lg">Good Luck!</span>
            <Button onClick={() => setCurrentQuestion((prev) => (prev += 1))}>
              Start Test
            </Button>
          </div>
        ) : (
          <TestQuestions setIsCompleted={setIsCompleted} />
        )
      ) : (
        <div className="text-center flex flex-col items-center gap-5">
          <h2 className="text-primary font-bold text-5xl max-[450px]:text-4xl">
            Test Completed
          </h2>
          <h3 className="text-center mt-20 text-3xl inline-flex items-center gap-3">
            Your IQ:{" "}
            <span className="text-6xl text-primary font-black">
              {85 + (score / questionsQuantity) * 30}
            </span>
          </h3>
          <h3 className="text-center mt-8 text-2xl">
            Correct answers: {score >= 20 ? 20 : score} / {questionsQuantity}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TestBody;
