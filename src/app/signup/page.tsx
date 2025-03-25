import { Metadata } from "next";
import SignUp from "./SignUp";
import Container from "@/components/container";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign up"
};

const LoginPage: React.FC = () => {
  return (
    <section className="py-10 min-h-[75vh] bg-gradient-to-tl from-[#d7d7d7] to-background">
      <Container className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-8 justify-between">
        <SignUp className="w-full" />
        <div className="w-full relative h-[400px] max-md:hidden" data-aos="fade-left">
            <Image src='/brain.webp' fill sizes="100%, 100%" className="object-cover" alt="Sign Up" />
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
