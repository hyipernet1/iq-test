import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import clsx from "clsx";

interface ContactUsProps {
  className?: string;
}

const ContactUs: React.FC<ContactUsProps> = ({ className }) => {
  return (
    <div className={clsx(className)}>
      <form className="bg-white px-4 rounded-md w-full mx-auto py-8">
        <h2 className="font-bold text-4xl text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-2 w-full gap-5 max-[500px]:grid-cols-1">
          <Input type="text" className="w-full" placeholder="Full name" />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full"
          />
        </div>
        <Input
          type="text"
          id="subject"
          placeholder="Subject"
          className="w-full mt-6"
        />
        <Textarea
          id="message"
          placeholder="Your message"
          className="w-full mt-6 max-h-[200px]"
        />
        <div className="mt-6">
          <Button type="submit" className="w-full mt-2">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
