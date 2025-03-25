import { Metadata } from "next";
import Unsubscribe from "./Unsubscribe";
import Container from "@/components/container";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Unsubscribe",
};

const UnsubscribePage: React.FC = () => {
  return (
    <section className="py-10 min-h-[75vh] bg-gradient-to-tl from-[#d7d7d7] to-background">
      <Container>
        <Unsubscribe className="w-full" />
      </Container>
    </section>
  );
};

export default UnsubscribePage;
