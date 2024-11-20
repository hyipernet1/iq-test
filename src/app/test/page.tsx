import { Metadata } from "next";
import Test from './Test'

export const metadata: Metadata = {
  title: 'IQ Test - Test'
}

export default function TestPage() {
  return (
    <section className="min-h-[75vh]">
        <Test />
    </section>
  );
}
