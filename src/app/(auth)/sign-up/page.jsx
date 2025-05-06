import Link from "next/link";
import styles from '@/styles/signup.module.css'
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";

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
      <form className={styles.form} autoComplete="off">
        <div>
          <label>Email address</label>
          <div className={styles.inputContainer}>
            <MdEmail />
            <input className={styles.input} type="email" placeholder="e.g. alex@email.com" />
          </div>
        </div>
        <div>
          <label>Create password</label>
          <div className={styles.inputContainer}>
            <IoIosLock />
            <input className={styles.input} type="password" placeholder="At least .8 characters" />
          </div>
        </div>
        <div>
          <label>Confirm password</label>
          <div className={styles.inputContainer}>
            <IoIosLock />
            <input className={styles.input} type="password" placeholder="At least .8 characters" />
          </div>
        </div>
          <p>Password must contain at least 8 characters</p>
          <button className={styles.submitBtn} type="submit">Create new account</button>

      </form>
      <div className={styles.loginDiv}>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

