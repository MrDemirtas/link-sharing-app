import ProfileForm from "@/components/ProfileForm";
import { getProfile } from "@/lib/action-profile";
import styles from "@/styles/profile.module.css";

export default async function Profile() {
  const { data: userData } = await getProfile();

  return (
    <main className={styles.main}>
      <section>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
        <ProfileForm userData={userData} />
      </section>
    </main>
  );
}
