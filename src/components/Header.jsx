"use client";

import { CircleUser, Eye, Link as LinkIcon, LogOut } from "lucide-react";

import ConfirmationModal from "./ConfirmationModal";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import styles from "@/styles/header.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const isLinksPage = pathname === "/links";
  const isProfilePage = pathname === "/profile";

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
  };

  const handleSignOutConfirm = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    setShowSignOutModal(false);
  };

  const handleSignOutCancel = () => {
    setShowSignOutModal(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/header-logo.svg"
            width={32}
            height={32}
            alt="logo"
            className={styles.mobileLogo}
          />
          <Image
            src="/images/logo.svg"
            width={182.5}
            height={40}
            alt="logo"
            className={styles.tabletLogo}
          />
        </div>
        <nav>
          <Link href="/links" className={isLinksPage ? styles.activeBtn : ""}>
            <LinkIcon width={20} height={20} />
            <span className={styles.linkText}>Links</span>
          </Link>
          <Link
            href="/profile"
            className={isProfilePage ? styles.activeBtn : ""}
          >
            <CircleUser width={20} height={20} />
            <span className={styles.linkText}>Profile Details</span>
          </Link>
        </nav>
        <div className={styles.rightSection}>
          <Link href="/preview" className={styles.previewBtn}>
            <Eye width={20} height={20} />
            <span className={styles.linkText}>Preview</span>
          </Link>
          <button onClick={handleSignOutClick} className={styles.signOutBtn}>
            <LogOut width={20} height={20} />
            <span className={styles.linkText}>Çıkış Yap</span>
          </button>
        </div>
      </header>

      <ConfirmationModal
        isOpen={showSignOutModal}
        onConfirm={handleSignOutConfirm}
        onCancel={handleSignOutCancel}
        title="Çıkış yapmak istediğinizden emin misiniz?"
        message="Bu işlem sizi uygulamadan çıkaracak ve tekrar giriş yapmanız gerekecek."
      />
    </>
  );
}
