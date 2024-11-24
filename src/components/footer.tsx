"use client";

import clsx from "clsx";
import Container from "./container";
import Link from "next/link";
import Button from "./ui/button";
import Image from "next/image";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx("py-10 bg-background text-foreground", className)}>
      <Container className="flex items-start justify-between gap-4 max-md:grid max-md:grid-cols-2 max-md:place-items-center max-md:[&>div]:text-center max-md:[&>div]:items-center max-md:[&>div>ul]:items-center max-[450px]:grid-cols-1 max-[450px]:gap-12">
        <div className="flex flex-col items-center justify-start text-left gap-6">
          <h3 className="text-lg uppercase font-bold tracking-widest">
            Our services
          </h3>
          <ul className="flex flex-col items-start gap-4 [&>li]:text-neutral-400">
            <li>
              <Link href="/login">Log in</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
            <li>
              <Link href="/unsubscribe">Unsubscribe</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start text-left gap-6">
          <h3 className="text-lg uppercase font-bold tracking-widest">Legal</h3>
          <ul className="flex flex-col items-start gap-4 [&>li]:text-neutral-400">
            <li>
              <Link href="/legal-notice">Legal notice</Link>
            </li>
            <li>
              <Link href="/terms-of-sales">Terms of sales</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start text-left gap-6">
          <h3 className="text-lg uppercase font-bold tracking-widest">
            About us
          </h3>
          <ul className="flex flex-col items-start gap-4 [&>li]:text-neutral-400">
            <li>
              <Link href="/#pricing">Offers</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact us</Link>
            </li>
            <li>
              <b className="text-[#343434]">hyipernet1@gmail.com</b>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start text-left gap-6">
          <h3 className="text-lg uppercase font-bold tracking-widest">LOGO</h3>
          <ul className="flex flex-col items-start gap-4 [&>li]:text-neutral-400">
            <li className="flex items-center justify-between gap-5">
              <Image
                src="/mastercard.svg"
                alt="mastercard"
                width={60}
                height={30}
              />
              <Image src="/visa.svg" alt="visa" width={60} height={30} />
            </li>
            <li>
              <Button>
                <Link href="/test">Start the test</Link>
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
