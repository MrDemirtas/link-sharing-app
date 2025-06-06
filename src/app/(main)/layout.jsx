import Header from "@/components/Header";
import LinksPreviewPhone from "@/components/LinksPreviewPhone";
import UserProvider from "@/lib/UserProvider";
import checkUserSession from "@/utils/check-user-session";
import styles from "@/styles/main-layout.module.css";

export default async function MainLayout({ children }) {
  const profileData = await checkUserSession();
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/api/profile/${profileData.id}`;

  const { data } = await fetch(url).then((r) => r.json());

  return (
    <UserProvider initialData={data}>
      <Header />
      <div className={styles.mobile}>{children}</div>
      <div className={styles.desktop}>
        <section className={styles.linksPreview}>
          <LinksPreviewPhone />
        </section>
        {children}
      </div>
    </UserProvider>
  );
}
