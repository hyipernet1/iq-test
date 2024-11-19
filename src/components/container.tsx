import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return <div className={clsx("container mx-auto px-2 max-lg:px-6 max-w-[1300px]", className)}>{children}</div>;
};

export default Container;
