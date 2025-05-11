import LinksPreviewPhone from "@/components/LinksPreviewPhone";
import ProfileForm from "@/components/ProfileForm";
import checkUserSession from "@/utils/check-user-session";
import { createClient } from "@/utils/supabase/server";
import styles from "@/styles/profile.module.css";

export default async function Profile() {
  const user = await checkUserSession();
  const supabase = await createClient();
  const { data: userData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main className={styles.main}>
      <section className={styles.linksPreview}>
        <LinksPreviewPhone />
      </section>
      <section>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
        <ProfileForm userData={userData} />
      </section>
    </main>
  );
}
