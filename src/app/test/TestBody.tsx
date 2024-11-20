"use client";

import clsx from "clsx";
import { useTest } from "./Test";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface TestBodyProps {
  className?: string;
}

const TestBody: React.FC<TestBodyProps> = ({ className }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
    questionsQuantity,
  } = useTest();

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
          <div>
            <h2 className="font-bold text-3xl text-center mb-4 bg-white">
              Question {currentQuestion + 1} / {questionsQuantity}
            </h2>
            <div className="h-[450px] w-full grid grid-cols-2 max-w-[1200px] mx-auto mt-14 max-lg:grid-cols-1 max-lg:h-full max-lg:w-[70%]">
              <div className="relative h-[450px]">
                <Image
                  src={questions[currentQuestion].questionImg}
                  alt={`Question ${currentQuestion}`}
                  fill
                  sizes="100%, 100%"
                />
              </div>
              <div className="w-[70%] ml-auto h-full flex flex-col items-center text-center justify-between gap-14 max-lg:m-[60px_auto_0_auto]">
                <h2 className="text-primary text-lg font-bold ">
                  Select the most logical answer:
                </h2>
                <div className="grid grid-cols-2 gap-6 w-full h-full max-lg:min-h-96">
                  {questions[currentQuestion].variantsImg.map(
                    (option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          if (
                            questions[currentQuestion].correct ===
                            index + 1
                          ) {
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
                        <p className="text-lg font-bold text-primary">
                          {index + 1}
                        </p>
                        <div className="flex items-center h-full w-[70%] justify-center cursor-pointer relative">
                          <Image
                            src={option}
                            alt={`Option ${index + 1}`}
                            fill
                            sizes="100%, 100%"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="text-center flex flex-col items-center gap-5">
          <h2 className="text-primary font-bold text-5xl">Test Completed</h2>
          <h3 className="text-center mt-20 text-3xl inline-flex items-center gap-3">
            Your IQ:{" "}
            <span className="text-6xl text-primary font-black">
              {score * 100}
            </span>
          </h3>
          <h3 className="text-center mt-8 text-2xl">
            Correct answers: {score} / {questionsQuantity}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TestBody;
