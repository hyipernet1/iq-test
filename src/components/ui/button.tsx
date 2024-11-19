import clsx from "clsx";
import { PropsWithChildren } from "react";

const Button: React.FC<PropsWithChildren<JSX.IntrinsicElements["button"]>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-md py-2 px-5 uppercase text-background font-semibold bg-primary hover:bg-slate-600 transition duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
