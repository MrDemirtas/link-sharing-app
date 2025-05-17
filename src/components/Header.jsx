"use client";

import { CircleUser, Eye, Link as LinkIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isLinksPage = pathname === "/links";
  const isProfilePage = pathname === "/profile";

  return (
    <header className={styles.header}>
      <Image src="/images/header-logo.svg" width={32} height={32} alt="logo" />
      <nav>
        <Link href="/links" className={isLinksPage ? styles.activeBtn : ""}>
          <LinkIcon width={20} height={20} />
        </Link>
        <Link href="/profile" className={isProfilePage ? styles.activeBtn : ""}>
          <CircleUser width={20} height={20} />
        </Link>
      </nav>
      <Link href="/preview">
        <Eye width={20} height={20} />
      </Link>
    </header>
  );
}
