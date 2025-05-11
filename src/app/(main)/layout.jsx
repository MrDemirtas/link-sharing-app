import Header from "@/components/Header";
import LinksPreviewPhone from "@/components/LinksPreviewPhone";
import styles from "@/styles/main-layout.module.css";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.mobile}>{children}</div>
      <div className={styles.desktop}>
        <section className={styles.linksPreview}>
          <LinksPreviewPhone />
        </section>
        {children}
      </div>
    </>
  );
}
