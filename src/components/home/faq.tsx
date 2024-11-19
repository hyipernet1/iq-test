import clsx from "clsx";
import Container from "../container";
import Link from "next/link";
import Button from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

interface FaqProps {
  className?: string;
}

const Faq: React.FC<FaqProps> = ({ className }) => {
  return (
    <section className={clsx("py-20 bg-gradient-to-bl from-[#d7d7d7] to-background", className)}>
      <Container className="flex flex-col items-center gap-20">
        <header className="w-full">
          <h2 className="font-bold text-3xl text-center">
            Frequently Asked Questions
          </h2>
        </header>
        <div className="grid grid-cols-2 grid-rows-2 gap-10 w-full max-md:grid-cols-1 max-md:[&>div]:text-center max-md:px-12 max-[500px]:px-3">
          <div className="text-left">
            <h3 className="font-bold text-2xl">
              What is the purpose of this IQ test?
            </h3>
            <p className="mt-4">
              Our IQ test is designed to assess your cognitive abilities,
              including logical reasoning, problem-solving, and pattern
              recognition. It provides an accurate estimate of your intelligence
              level based on scientifically validated methods.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-2xl">
              How long does the test take to complete?
            </h3>
            <p className="mt-4">
              The test is structured to be quick and efficient, taking
              approximately 20 minutes to complete. It's designed to deliver
              precise results without taking too much of your time.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-2xl">
              How are the results calculated?
            </h3>
            <p className="mt-4">
              Your results are calculated based on the number of correct answers
              and are compared to global averages using a standardized scoring
              system. The final IQ score reflects your performance relative to
              others in your age group.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-2xl">
              Is this test suitable for everyone?
            </h3>
            <p className="mt-4">
              Yes, our test is suitable for individuals aged 16 and above.
              However, it’s not intended for medical or psychological diagnosis
              but rather for personal insight and intellectual growth.
            </p>
          </div>
        </div>
        <Button className="w-1/3 justify-center flex px-12 py-4 group text-2xl border-2 hover:border-primary hover:bg-transparent hover:text-foreground max-md:py-2 max-md:text-base max-md:w-2/3 max-[400px]:w-[80%]">
          <Link href="/test" className="flex items-center gap-4">
            Test Your IQ
            <ArrowRightIcon
              className="group-hover:translate-x-full duration-300 transition-transform"
              size={40}
            />
          </Link>
        </Button>
      </Container>
    </section>
  );
};

export default Faq;
