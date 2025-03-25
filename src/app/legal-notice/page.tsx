import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
};

const LegalNotice = () => {
  return (
    <>
      <Container className="py-20">
        <header>
          <h2 className="font-black text-5xl">Legal Notice</h2>
          <p className="text-sm text-neutral-500 mt-2">
            Innospark Media Limited, an Irish entity, registered at 77 Camden
            Street Lower, Dublin, Dublin 2, D02 XE80, IRELAND
          </p>
        </header>
        <main className="mt-6">
          <h3 className="font-bold text-2xl">Registered Address:</h3>
          <p>
            77 Camden Street Lower, Dublin, Dublin 2, D02 XE80, IRELAND <br />
            Contact: contact@iqcenter.net <br />
            <b>Legal representation:</b> Innospark Media Limited <br />
            <b>Director of Publications:</b> Innospark Media Limited <br />
            <b>Website Manager:</b> Innospark Media Limited <br />
            <b>Website Hosting:</b> Vercel <br />
            The publisher is committed to adhering to all applicable laws
            related to website creation and operation. <br />
            Innospark Media Limited requests that all users carefully review the
            following terms and conditions. By accessing, browsing, or using the
            website, users confirm that <br />
            they have read, understood, and agree to these terms and conditions.
          </p>
        </main>
      </Container>
    </>
  );
};

export default LegalNotice;
