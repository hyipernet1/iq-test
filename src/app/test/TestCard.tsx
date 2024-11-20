"use client";

import clsx from "clsx";
import Image from "next/image";
import { TQuestion } from "./Test";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface TestCardProps {
  className?: string;
  questions: TQuestion[];
  currentQuestion: number;
  questionsQuantity: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
}

const TestCard: React.FC<TestCardProps> = ({
  className,
  currentQuestion,
  questionsQuantity,
  questions,
  setIsCompleted,
  setCurrentQuestion,
  setScore,
}) => {
  return (
    <div
      className={clsx(
        "h-[450px] w-full grid grid-cols-2 max-w-[1200px] mx-auto my-14 max-lg:grid-cols-1 max-lg:h-full max-lg:w-[600px] max-sm:w-[90%]",
        className
      )}
    >
      <div className="relative h-[450px] max-sm:h-[300px] max-sm:w-2/3 max-sm:mx-auto max-[500px]:w-full">
        <Image
          src={questions[currentQuestion].questionImg}
          alt={`Question ${currentQuestion}`}
          fill
          sizes="100%, 100%"
        />
      </div>
      <div className="w-[70%] ml-auto h-full flex flex-col items-center text-center justify-between gap-14 max-lg:w-full max-lg:m-[60px_auto_0_auto]">
        <h2 className="text-primary text-lg font-bold ">
          Select the most logical answer:
        </h2>
        <div className="grid grid-cols-2 gap-6 w-full h-full max-lg:min-h-96 max-sm:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:min-h-[900px]">
          {questions[currentQuestion].variantsImg.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                if (questions[currentQuestion].correct === index + 1) {
                  setScore((prev) => (prev += 1));
                }
                if (currentQuestion === questionsQuantity - 1) {
                  toast.loading("Counting Results", {
                    duration: 2000,
                  });
                  setTimeout(() => setIsCompleted(true), 2500);
                } else {
                  setCurrentQuestion((prev) => (prev += 1));
                }
              }}
              className="flex flex-col items-center text-center gap-4 py-4 cursor-pointer rounded-lg bg-slate-200 border-b-2 border-primary"
            >
              <p className="text-lg font-bold text-primary">{index + 1}</p>
              <div className="flex items-center h-full w-[70%] justify-center cursor-pointer relative">
                <Image
                  src={option}
                  alt={`Option ${index + 1}`}
                  fill
                  sizes="100%, 100%"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
