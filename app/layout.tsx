import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Crimson CarShare",
  description: "Personal CarSharing for Harvard Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://crimson-carshare.live"} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta
          property="og:image"
          content={
            "https://arztucsgkimyfwgxmyms.supabase.co/storage/v1/object/public/images/Logo.png"
          }
        />
        <meta
          property="og:image:secure_url"
          content="https://arztucsgkimyfwgxmyms.supabase.co/storage/v1/object/public/images/Logo.png"
        />
      </Head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-[80vh] flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
