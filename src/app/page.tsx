import Faq from "@/components/home/faq";
import Hero from "@/components/home/hero";
import Plans from "@/components/home/plans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'IQ Logic - Home'
}

export default function Home() {
  return (
    <section>
      <Hero />
      <Faq />
      <Plans />
    </section>
  );
}
