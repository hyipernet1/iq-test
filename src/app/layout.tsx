import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer";
import Provider from "./provider";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { TOKEN } from "@/types/enums";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IQ Logic",
  description: "IQ Logic",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStorage = await cookies();
  const refreshToken = cookieStorage.get(TOKEN.REFRESH_TOKEN)?.value || "";

  return (
    <html lang="en" className={poppins.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PDFR2XRG');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PDFR2XRG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Provider refreshToken={refreshToken}>
          <Toaster
            toastOptions={{ style: { background: "#222", color: "#fff" } }}
          />
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
