import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nalinverma.com"),
  title: "Nalin Verma",
  description:
    "Management Engineering @ Waterloo. Applied AI and capital markets. Open for Winter 2027 internships.",
  keywords: [
    "Nalin Verma",
    "Machine Learning",
    "AI",
    "Applied AI",
    "Finance",
    "Quant",
    "Waterloo",
    "Tiger Analytics",
    "WAT.ai",
    "InsightPulse",
  ],
  authors: [{ name: "Nalin Verma" }],
  creator: "Nalin Verma",
  openGraph: {
    title: "Nalin Verma",
    description:
      "Management Engineering @ Waterloo. Applied AI and capital markets.",
    url: "https://nalinverma.com",
    siteName: "Nalin Verma",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalin Verma",
    description:
      "Management Engineering @ Waterloo. Applied AI and capital markets.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ecd8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen">
        <div className="v2-root v2-paper">{children}</div>
      </body>
    </html>
  );
}
