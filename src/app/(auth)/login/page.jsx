import Link from "next/link";
import LoginForm from "@/components/login-form";
import styles from "@/styles/login.module.css";

export const metadata = {
  title: "Login",
  description: "Link sharing app - Login",
};

export default function Login() {
  return (
    <>
      <LoginForm />
      <div className={styles.createAccoınt}>
        <p>Don't have an account?</p>
        <Link href="/sign-up">Create account</Link>
      </div>
    </>
  );
}
