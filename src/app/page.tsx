import Faq from "@/components/home/faq";
import Hero from "@/components/home/hero";
import Plans from "@/components/home/plans";
import iPhonePromo from "@/components/home/iPhonePromo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My IQ Rank'
}

export default function Home() {
  return (
    <section>
      <Hero />
      <iPhonePromo /> 
      <Faq />
      <Plans />
    </section>
  );
}

