import clsx from "clsx";
import Container from "../container";
import Link from "next/link";
import Button from "../ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

interface PlansProps {
  className?: string;
}

const Plans: React.FC<PlansProps> = ({ className }) => {
  return (
    <section
      className={clsx(
        "py-20 bg-gradient-to-tl from-[#d7d7d7] to-background border-t-[rgba(0,0,0,0.2)] border-[1px]",
        className
      )}
    >
      <Container className="flex flex-col items-center gap-20">
        <header className="w-full">
          <h2 className="font-bold text-3xl text-center">Our Plans</h2>
        </header>
        <div className="flex flex-col w-2/3 mx-auto items-center gap-10 bg-background rounded-md p-8 max-sm:w-[90%] max-[430px]:w-full">
          <h3 className="font-bold text-2xl text-center">Monthly Plan</h3>
          <div className="text-center">
            <p className="text-lg">
              <span className="text-primary text-7xl font-black max-[430px]:text-5xl">$29</span>{" "}
              /month
            </p>
            <p className="text-neutral-400 mt-2 max-[430px]:text-sm">
              7-day trial available for $0.50
            </p>
          </div>
          <ul className="[&>li]:flex [&>li]:items-center [&>li]:gap-2 flex flex-col items-start gap-3 text-lg max-[430px]:text-base">
            <li><CheckIcon size={30} /> Unlimited IQ Tests</li>
            <li><CheckIcon size={30} /> Certificate with your result</li>
            <li><CheckIcon size={30} /> 24/7 Support</li>
          </ul>
          <Button className="w-2/3 py-4 text-lg"><Link href='/login'>Choose</Link></Button>
        </div>
      </Container>
    </section>
  );
};

export default Plans;
