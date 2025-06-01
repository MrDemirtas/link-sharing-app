import Image from "next/image";
import styles from "@/styles/auth.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        <div className={styles.logoSection}>
          <Image
            src="/images/logo.svg"
            width={182.5}
            height={40}
            alt="devlinks logo"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
