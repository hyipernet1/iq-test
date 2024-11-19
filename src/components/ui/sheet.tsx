"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

const SheetContext = createContext<{
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
} | null>(null);

export function Sheet({
  trigger,
  children,
  title,
  className,
}: PropsWithChildren<{
  trigger: JSX.Element;
  title?: string;
  className?: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSheet = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <SheetContext.Provider value={{ isOpen, closeSheet, openSheet }}>
      {React.cloneElement(trigger, { onClick: openSheet })}
      {isOpen &&
        createPortal(
          <SheetContent className={className} title={title}>
            {children}
          </SheetContent>,
          document.body
        )}
    </SheetContext.Provider>
  );
}

function SheetContent({
  children,
  className,
  title,
}: PropsWithChildren<{ className?: string; title?: string }>) {
  const sheetContextValues = useContext(SheetContext);

  if (!sheetContextValues)
    throw new Error("SheetContent must be used within a <Sheet />");

  const { closeSheet } = sheetContextValues;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
      <div
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[999]"
        onClick={closeSheet}
      />
      <div
        className="fixed right-0 top-0 w-1/3 max-md:w-1/2 max-[620px]:w-2/3 p-4 pt-1 h-full bg-white z-[1000] max-xs:w-4/5"
        data-aos="fade-left"
      >
        <div className="w-full py-4 flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <X onClick={closeSheet} />
        </div>
        <div className={clsx("w-full h-full", className)}>{children}</div>
      </div>
    </div>
  );
}
