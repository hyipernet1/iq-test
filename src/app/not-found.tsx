import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IQ Logic - Not Found",
};

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] pt-[100px] text-center flex flex-col items-center gap-6">
      <h2 className="font-bold text-3xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="text-primary font-medium underline-offset-4 hover:underline" href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
