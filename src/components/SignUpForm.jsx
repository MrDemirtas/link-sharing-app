"use client";
import styles from '@/styles/signup.module.css'
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import signUp from '@/lib/action-signup';
import { useActionState } from 'react';

export default function SignUpForm() {
  const [message, formAction, isPending] = useActionState(signUp, null);


  return (
    <>
      <form action={formAction} className={styles.form} autoComplete="off">
        <div>
          <label>Email address</label>
          <div className={styles.inputContainer}>
            <MdEmail />
            <input name="email" className={styles.input} type="email" placeholder="e.g. alex@email.com" />
            {message?.type == "email" && <p>{message?.error}</p>}
          </div>
        </div>
        <div>
          <label>Create password</label>
          <div className={styles.inputContainer}>
            <IoIosLock />
            <input name="password" className={styles.input} type="password" placeholder="At least 8 characters" />
            {message?.type == "password" && <p>{message?.error}</p>}
          </div>
        </div>
        <div>
          <label>Confirm password</label>
          <div className={styles.inputContainer}>
            <IoIosLock />
            <input name="passwordConfirmation" className={styles.input} type="password" placeholder="At least 8 characters" />
            {message?.type == "password" && <p>{message?.error}</p>}
          </div>
        </div>
        <p>Password must contain at least 8 characters</p>
        <button className={styles.submitBtn} type="submit">Create new account</button>
        {isPending ? "Loading..." : message?.error}
      </form>
    </>
  )
}