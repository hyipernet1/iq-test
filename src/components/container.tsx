import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return <div className={clsx("container mx-auto max-sm:px-2", className)}>{children}</div>;
};

export default Container;
