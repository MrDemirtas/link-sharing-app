import { AlertCircle, Home } from "lucide-react";

import Link from "next/link";
import styles from "@/styles/not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <AlertCircle className={styles.icon} />
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Sayfa Bulunamadı</h2>
          <p className={styles.description}>
            Aradığınız profil mevcut değil veya taşınmış olabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
