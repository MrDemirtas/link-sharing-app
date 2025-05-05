import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <main style={{ padding: 32 }}>
      <header>
        <Image
          src="/images/logo.svg"
          alt="Link Sharing App"
          width={182.5}
          height={40}
        />
      </header>
      {children}
    </main>
  );
}
