"use client";

import clsx from "clsx";
import { useTest } from "./Test";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import TestQuestions from "./TestQuestions";
import { useRouter } from "next/navigation";

interface TestBodyProps {
  className?: string;
}

const TestBody: React.FC<TestBodyProps> = ({ className }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { push } = useRouter();
  const { currentQuestion, setCurrentQuestion, questionsQuantity } = useTest();

  useEffect(() => {
    if (isCompleted) push("/test/completed");
  }, [isCompleted]);

  return (
    <div className={clsx("py-10", className)}>
      {!isCompleted &&
        (currentQuestion === -1 ? (
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
        ))}
    </div>
  );
};

export default TestBody;
