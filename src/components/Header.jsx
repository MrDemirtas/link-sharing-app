"use client";

import { CircleUser, Eye, Link } from "lucide-react";

import Image from "next/image";
import styles from "@/styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src="/images/header-logo.svg" width={32} height={32} alt="logo" />
      <nav>
        <button className={styles.activeBtn}>
          <Link width={20} height={20} />
        </button>
        <button>
          <CircleUser width={20} height={20} />
        </button>
      </nav>
      <button>
        <Eye width={20} height={20} />
      </button>
    </header>
  );
}
