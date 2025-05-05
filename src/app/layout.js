import "./reset.css";
import "./global.css";

import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Link Sharing App",
  description: "Link sharing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable}`}>{children}</body>
    </html>
  );
}
