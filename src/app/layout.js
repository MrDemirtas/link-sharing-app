import "./reset.css";
import "./globals.css";

import { Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";

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
        {children}
        <Toaster
          position="bottom-right"
          richColors
          expand
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
