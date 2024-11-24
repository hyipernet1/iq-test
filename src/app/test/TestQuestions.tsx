"use client";

import Container from "@/components/container";
import clsx from "clsx";
import { useTest } from "./Test";
import TestCard from "./TestCard";
import { TimerIcon } from "lucide-react";
import { useTime } from "@/hooks/useTime";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TestQuestionsProps {
  className?: string;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

const TestQuestions: React.FC<TestQuestionsProps> = ({
  className,
  setIsCompleted,
}) => {
  const [timeLeft, setTimeLeft] = useState(1200);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const { currentQuestion, questionsQuantity } = useTest();
  return (
    <div className={clsx(className)}>
      <Container>
        <div className="w-full mb-10">
          <div className="mb-4 flex w-full items-center justify-between">
            <h2 className="font-bold text-2xl text-left bg-white">
              Question {currentQuestion + 1} / {questionsQuantity}
            </h2>
            <div className="flex items-center gap-2 text-2xl">
              <TimerIcon />
              {useTime(timeLeft)}
            </div>
          </div>
          <div className="w-full h-4 bg-transparent border-[1px] border-[rgba(0,0,0,.4)] rounded-md">
            <div
              className="h-full bg-primary rounded-md duration-500 ease-in-out"
              style={{
                width: `${((currentQuestion + 1) / questionsQuantity) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </Container>

      <TestCard setIsCompleted={setIsCompleted} />
    </div>
  );
};

export default TestQuestions;
