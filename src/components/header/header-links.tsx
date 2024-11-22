"use client";

import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/hooks/useAuthStore";
import clsx from "clsx";
import Link from "next/link";
import toast from "react-hot-toast";

interface HeaderLinksProps {
  className?: string;
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ className }) => {
  const { user } = useAuthStore();
  const { mutateAsync: logout } = useLogout();
  return (
    <ul className={clsx("flex items-center gap-10", className)}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/contact-us">Contact Us</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link href="/unsubscribe">Unsubscribe</Link>
          </li>
          <li>
            <p
              className="cursor-pointer"
              onClick={async () => {
                try {
                  await logout();
                  window.location.reload();
                } catch {}
              }}
            >
              Logout
            </p>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/login">Log In</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default HeaderLinks;
