import "./reset.css";
import "./globals.css";

import Header from "@/components/Header";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Link Sharing App",
  description: "Link sharing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className}`} suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
