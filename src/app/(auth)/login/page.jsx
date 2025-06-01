import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import styles from "@/styles/login.module.css";

export const metadata = {
  title: "Login",
  description: "Link sharing app - Login",
};

export default async function Login() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error || data?.user) {
    redirect("/");
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginHeader}>
        <h1>Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>
      <LoginForm />
      <div className={styles.createAccount}>
        <p>Don't have an account?</p>
        <Link href="/sign-up">Create account</Link>
      </div>
    </div>
  );
}
