import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import styles from "@/styles/signup.module.css";

export const metadata = {
  title: "Sign Up",
  description: "Link sharing app - Sign Up",
};

export default async function SignUp() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error || data?.user) {
    redirect("/");
  }

  return (
    <div className={styles.signupPage}>
      <div className={styles.signUpHeader}>
        <h1>Create account</h1>
        <p>Let's get you started sharing your links!</p>
      </div>
      <SignUpForm />
      <div className={styles.loginDiv}>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
