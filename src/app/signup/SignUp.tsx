import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import clsx from "clsx";
import Link from "next/link";

interface SignUpProps {
  className?: string;
}

const SignUp: React.FC<SignUpProps> = ({ className }) => {
  return (
    <div className={clsx(className)} data-aos="fade-right">
      <form className="bg-white px-4 rounded-md w-full mx-auto py-8">
        <h2 className="font-bold text-4xl text-center mb-8">Sign up</h2>
        <div className="grid grid-cols-2 w-full gap-5 max-[500px]:grid-cols-1">
          <Input type="text" className="w-full" placeholder="Name" />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full"
          />
        </div>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mt-6"
        />
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Password confirmation"
          className="w-full mt-6"
        />
        <div className="mt-6">
          <p className="max-[500px]:text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
