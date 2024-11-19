import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ProviderProps {
  className?: string;
}

const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({
  className,
  children,
}) => {
  return <div className={clsx("", className)}>{children}</div>;
};

export default Provider;
