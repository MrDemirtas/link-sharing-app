import styles from "@/styles/preview-header.module.css";
import Link from "next/link";

export default function PreviewHeader() {
  return (
    <header className={styles.previewHeader}>
      <Link href="/links">Back to Editor</Link>
      <button>Share Link</button>
    </header>
  );
}
