import "./reset.css";
import "./globals.css";

import { Instrument_Sans } from "next/font/google";

const instrument_Sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Empty Next App",
  description: "Empty Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={instrument_Sans.className}>{children}</body>
    </html>
  );
}
