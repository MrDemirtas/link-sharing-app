import Link from "next/link";
import styles from '@/styles/signup.module.css'
import SignUpForm from "@/components/SignUpForm";

export const metadata = {
  title: "Sign Up",
  description: "Link sharing app - Sign Up",
};

export default function SignUp() {
  return (
    <div className={styles.signupPage}>
      <div className={styles.signUpHeader}>
        <h1>Create account</h1>
        <p>Let’s get you started sharing your links!</p>
      </div>
      <SignUpForm />
      <div className={styles.loginDiv}>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

