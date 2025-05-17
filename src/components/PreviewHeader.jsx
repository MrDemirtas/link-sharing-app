"use client";
import styles from "@/styles/preview-header.module.css";
import Link from "next/link";
import { toast } from "sonner";

export default function PreviewHeader({ slug }) {
  function copyLink() {
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    const link = base + "/" + slug;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  }
  return (
    <header className={styles.previewHeader}>
      <Link href="/links">Back to Editor</Link>
      <button onClick={copyLink}>Share Link</button>
    </header>
  );
}
