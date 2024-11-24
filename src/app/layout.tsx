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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStorage = await cookies();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider refreshToken={cookieStorage.get(TOKEN.REFRESH_TOKEN)?.value}>
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
