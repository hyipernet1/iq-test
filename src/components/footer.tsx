"use client";

import clsx from "clsx";
import Container from "./container";
import Logo from "./logo";
import HeaderLinks from "./header/header-links";
import { MoveUpIcon } from "lucide-react";
import Button from "./ui/button";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx("py-10 bg-background text-foreground", className)}>
      <Container className="flex items-center justify-between gap-4">
        <div>
          <Logo />
          <span className="max-[500px]:text-sm max-[500px]:pr-10">Copyrights © 2024 All rights reserved by IQ Test</span>
        </div>
        <HeaderLinks className="max-lg:hidden" />
        <Button
          className="aspect-square !px-3 !py-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <MoveUpIcon />
        </Button>
      </Container>
    </footer>
  );
};

export default Footer;
