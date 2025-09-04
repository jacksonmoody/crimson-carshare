import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Crimson CarShare",
  description: "Personal CarSharing for Harvard Students",
  openGraph: {
    title: "Crimson CarShare",
    description: "Personal CarSharing for Harvard Students",
    url: "https://crimson-carshare.tech",
    siteName: "Crimson CarShare",
    images: [
      {
        url: "https://i.ibb.co/brbZWdF/pngwing-com.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <SpeedInsights />
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
