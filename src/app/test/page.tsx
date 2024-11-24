import { Metadata } from "next";
import Test from './Test'

export const metadata: Metadata = {
  title: 'IQ Logic - Test'
}

export default function TestPage() {
  return (
    <section className="min-h-[75vh]">
        <Test />
    </section>
  );
}
