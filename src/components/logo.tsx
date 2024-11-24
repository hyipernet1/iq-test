import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Link href="/">
        <Image src={"/logo.jpg"} width={100} height={100} alt={"Logo"} />
        <h1 className="font-black text-3xl hidden">LOGO</h1>
      </Link>
    </div>
  );
};

export default Logo;
