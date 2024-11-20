import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import clsx from "clsx";
import Link from "next/link";

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  return (
    <div className={clsx(className)} data-aos="fade-right">
      <form className="bg-white px-4 rounded-md w-full mx-auto py-8">
        <h2 className="font-bold text-4xl text-center mb-8">Login</h2>
        <Input type="email" id="email" placeholder="Email" className="w-full" />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mt-6"
        />
        <div className="mt-16">
          <p className="max-[500px]:text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold">
              Register
            </Link>
          </p>
          <Button type="submit" className="w-full mt-2">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
