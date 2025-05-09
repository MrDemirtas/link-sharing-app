import ProfileForm from "@/components/ProfileForm";
import checkUserSession from "@/utils/check-user-session";
import styles from "@/styles/profile.module.css";

export default async function Profile() {
  await checkUserSession();

  return (
    <main className={styles.main}>
      <h1>Profile Details</h1>
      <p>Add your details to create a personal touch to your profile.</p>
      <ProfileForm />
    </main>
  );
}
