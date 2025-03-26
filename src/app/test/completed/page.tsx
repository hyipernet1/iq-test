import { Metadata } from "next";
import TestCompleted from "./TestCompleted";

export const metadata: Metadata = {
    title: 'IQ Test Completed'
};

const TestCompletedPage: React.FC = () => {
  return (
    <section className="min-h-[75vh]">
      <TestCompleted />
    </section>
  );
};

export default TestCompletedPage;
