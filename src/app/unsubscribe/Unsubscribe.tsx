import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";

interface UnsubscribeProps {
  className?: string;
}

const Unsubscribe: React.FC<UnsubscribeProps> = ({ className }) => {
  return (
    <div className={clsx(className)}>
      <form className="bg-white px-4 rounded-md w-[60%] mx-auto py-14 max-sm:w-full">
        <h2 className="font-bold text-3xl text-center mb-8">Subscription cancellation request</h2>
        <p className="text-center text-neutral-500 -mt-5 mb-3 max-sm:text-sm">Enter your email address to cancel your subscription:</p>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full mt-6"
        />
        <div className="mt-6">
          <Button className="w-1/3 max-lg:w-2/3 max-[570px]:w-full mx-auto justify-center items-center gap-4 flex group border-2 hover:border-primary hover:bg-transparent hover:text-foreground">
              Validate
              <ArrowRightIcon
                className="group-hover:translate-x-full duration-300 transition-transform"
                size={30}
              />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Unsubscribe;
