import clsx from "clsx";
import Link from "next/link";

interface HeaderLinksProps {
  className?: string;
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ className }) => {
  return (
    <ul className={clsx("flex items-center gap-10", className)}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/login">Log In</Link>
      </li>
      <li>
        <Link href="/contact-us">Contact Us</Link>
      </li>
      <li>
        <Link href="/unsubscribe">Unsubscribe</Link>
      </li>
    </ul>
  );
};

export default HeaderLinks;
