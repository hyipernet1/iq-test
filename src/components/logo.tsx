import clsx from "clsx";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Link href="/">
        <h1 className="font-black text-3xl">LOGO</h1>
      </Link>
    </div>
  );
};

export default Logo;
