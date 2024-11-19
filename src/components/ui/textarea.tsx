import clsx from "clsx";

const Textarea: React.FC<JSX.IntrinsicElements["textarea"]> = ({
  children,
  className,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "rounded-md py-2 px-5 text-foreground font-semibold border-[1px] border-[rgba(0,0,0,0.2)] resize-y",
        className
      )}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
