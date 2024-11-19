import clsx from "clsx";
import { PropsWithChildren } from "react";

const Input: React.FC<JSX.IntrinsicElements["input"]> = ({
  children,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={clsx(
        "rounded-md py-2 px-5 text-foreground font-semibold border-[1px] border-[rgba(0,0,0,0.2)]",
        className
      )}
    />
  );
};

export default Input;
