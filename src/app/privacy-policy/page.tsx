import Container from "@/components/container";
import { Metadata } from "next";
import { privacyPolicy } from "./privacyPolicy.data";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <>
      <Container className="py-20">
        <h2 className="font-black text-5xl">Privacy Policy</h2>
        <p className="mt-6">
          We respect your privacy and are committed to protecting it through our
          compliance with this privacy policy (“Policy”). This Policy describes
          the types of information we may collect from you or that you may
          provide (“Personal Information”) on the iqcenter.net website
          (“Website” or “Service”) and any of its related products and services
          (collectively, “Services”), and our practices for collecting, using,
          maintaining, protecting, and disclosing that Personal Information. It
          also describes the choices available to you regarding our use of your
          Personal Information and how you can access and update it. This Policy
          is a legally binding agreement between you (“User”, “you” or “your”)
          and Innospark Media Limited (“Innospark Media Limited”, “we”, “us” or
          “our”). If you are entering into this agreement on behalf of a
          business or other legal entity, you represent that you have the
          authority to bind such entity to this agreement, in which case the
          terms “User”, “you” or “your” shall refer to such entity. If you do
          not have such authority, or if you do not agree with the terms of this
          agreement, you must not accept this agreement and may not access and
          use the Website and Services. By accessing and using the Website and
          Services, you acknowledge that you have read, understood, and agree to
          be bound by the terms of this Policy. This Policy does not apply to
          the practices of companies that we do not own or control, or to
          individuals that we do not employ or manage.
        </p>
        <main className="mt-7">
          <h3 className="font-bold text-2xl">Table of Contents</h3>
          <ul className="list-disc list-inside mt-1 flex flex-col items-start [&>li]:text-blue-500">
            {privacyPolicy.map(({ id, title }, index) => (
              <li key={index}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>

          {privacyPolicy.map(({ id, title, content }, index) => (
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

export default PrivacyPolicy;
