'use client'

import clsx from "clsx";
import { PropsWithChildren, useEffect } from "react";
import AOS from 'aos'
import "aos/dist/aos.css";

interface ProviderProps {
  className?: string;
}

const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({
  className,
  children,
}) => {
  useEffect(() => {
    AOS.init({
      offset: 200
    });
  }, [])
  return <div className={clsx("", className)}>{children}</div>;
};

export default Provider;
