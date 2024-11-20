import clsx from "clsx";
import Container from "../container";
import Button from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "py-24 bg-gradient-to-tl from-[#d7d7d7] to-background border-b-[rgba(0,0,0,0.2)] border-[1px]",
        className
      )}
    >
      <Container className="flex items-start justify-between gap-5 overflow-hidden">
        <div data-aos="fade-right" className="w-[60%] overflow-hidden max-lg:w-[80%] flex flex-col gap-7 max-md:w-full max-md:text-center">
          <h2 className="text-6xl font-bold max-sm:text-4xl">
            Your Intelligence,
            <br />
            Your Journey
          </h2>
          <p className="uppercase font-medium text-gray-600 max-sm:text-sm">
            Explore your cognitive potential with our personalized IQ test.
            Unlock tailored insights, embrace challenges, and take the first
            step toward understanding your mind’s true capabilities.
          </p>
          <Button className="w-2/3 max-sm:py-2 max-sm:px-12 max-sm:text-lg max-sm:w-min max-sm:text-nowrap max-md:mx-auto justify-center flex px-12 py-4 group text-2xl border-2 hover:border-primary hover:bg-transparent hover:text-foreground">
            <Link href="/test" className="flex items-center gap-4">
              Test Your IQ
              <ArrowRightIcon
                className="group-hover:translate-x-full duration-300 transition-transform"
                size={40}
              />
            </Link>
          </Button>
        </div>
        <div data-aos="fade-left" className="overflow-hidden relative w-1/2 h-[400px] max-md:hidden">
          <Image
            src="/iq.png"
            fill
            sizes="100%, 100%"
            className="object-cover"
            alt="IQ"
          />
        </div>
      </Container>
      <Container className="mt-20 flex w-full items-center justify-around [&>div_span]:text-7xl [&>div_span]:font-bold [&>div]:text-lg max-lg:grid max-lg:grid-cols-2 max-lg:gap-10 max-lg:w-full max-lg:text-center max-sm:grid-cols-1 max-sm:gap-6 max-sm:[&>div_span]:text-4xl">
        <div data-aos="fade-down" data-aos-delay='200' data-aos-offset='10'>
          <span>20</span> Questions
        </div>
        <div data-aos="fade-down" data-aos-delay='400' data-aos-offset='10'>
          <span>100%</span> Accurate
        </div>
        <div data-aos="fade-down" data-aos-delay='500' data-aos-offset='10'>
          <span>106</span> average IQ
        </div>
      </Container>
    </div>
  );
};

export default Hero;
