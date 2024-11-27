import clsx from "clsx";
import Container from "../container";
import Logo from "../logo";
import HeaderLinks from "./header-links";
import Button from "../ui/button";
import Link from "next/link";
import { Sheet } from "../ui/sheet";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const HeaderButtons = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-5 w-[80%] justify-between",
        className
      )}
    >
      <HeaderLinks />
      <Button className="!p-0">
        <Link className="px-4 py-2 block" href="/test">START THE TEST</Link>
      </Button>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      data-aos="fade-down"
      className={clsx(
        "py-5 w-full border-b-[1px] border-[rgb(170, 170, 170)] bg-background text-foreground",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Logo />
        <HeaderButtons className="max-md:hidden" />
        <Sheet
          title="Menu"
          trigger={
            <Button className="md:hidden">
              <MenuIcon />
            </Button>
          }
        >
          <HeaderButtons className="mx-auto flex-col gap-5 [&>ul]:flex-col [&>ul]:gap-5" />
        </Sheet>
      </Container>
    </header>
  );
};

export default Header;
