import Container from "@/components/container";
import { Metadata } from "next";
import { termsOfSales } from "./termsOfSales.data";

export const metadata: Metadata = {
  title: "IQ Logic - Terms of Sales",
};

const TermsOfSales = () => {
  return (
    <>
      <Container className="py-20">
        <h2 className="font-black text-5xl">Terms and conditions</h2>
        <p className="mt-6">
          These terms and conditions (“Agreement”) set forth the general terms
          and conditions of your use of the iqcenter.net website (“Website” or
          “Service”) and any of its related products and services (collectively,
          “Services”). This Agreement is legally binding between you (“User”,
          “you” or “your”) and Innospark Media Limited (“Innospark Media
          Limited”, “we”, “us” or “our”). If you are entering into this
          agreement on behalf of a business or other legal entity, you represent
          that you have the authority to bind such entity to this agreement, in
          which case the terms “User”, “you” or “your” shall refer to such
          entity. If you do not have such authority, or if you do not agree with
          the terms of this agreement, you must not accept this agreement and
          may not access and use the Website and Services. By accessing and
          using the Website and Services, you acknowledge that you have read,
          understood, and agree to be bound by the terms of this Agreement. You
          acknowledge that this Agreement is a contract between you and
          Innospark Media Limited, even though it is electronic and is not
          physically signed by you, and it governs your use of the Website and
          Services.
        </p>
        <main className="mt-7">
          <h3 className="font-bold text-2xl">Table of Contents</h3>
          <ul className="list-disc list-inside mt-1 flex flex-col items-start [&>li]:text-blue-500">
            {termsOfSales.map(({ id, title }, index) => (
              <li key={index}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>

          {termsOfSales.map(({ id, title, content }, index) => (
            <section key={index} className="py-6" id={id}>
              <h3 className="font-bold text-2xl">{title}</h3>
              <p className="mt-6">{content}</p>
            </section>
          ))}

        </main>
      </Container>
    </>
  );
};

export default TermsOfSales;
