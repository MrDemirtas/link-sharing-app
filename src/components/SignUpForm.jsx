"use client";
import styles from '@/styles/signup.module.css'
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import signUp from '@/lib/action-signup';
import { useActionState, useEffect, useState } from 'react';

export default function SignUpForm() {
  const [message, formAction, isPending] = useActionState(signUp, null);
  const [warning, setWarning] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (message?.error && message?.type == "email") {
      setHasEmailError(true);
    } else if (message?.error && message?.type == "password") {
      setHasPasswordError(true);
    }
  }, [message])

  function setNoError(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  return (
    <>
      <form action={formAction} className={styles.form} autoComplete="off">
        <div>
          <label>Email address</label>
          <div className={`${styles.inputContainer} ${hasEmailError ? styles.inputError : ""}`}>
            <MdEmail />
            <input onChange={setNoError} name="email" className={styles.input} type="email" placeholder="e.g. alex@email.com" />
            {message?.type == "email" && <p>{message?.error}</p>}
          </div>
        </div>
        <div>
          <label>Create password</label>
          <div className={`${styles.inputContainer} ${hasPasswordError ? styles.inputError : ""}`}>
            <IoIosLock />
            <input  onChange={setNoError} name="password" className={message?.type == "password" ? styles.input : `${styles.input} ${styles.inputError}`} type="password" placeholder="At least .8 characters" />
            {message?.type == "password" && <p>{message?.error}</p>}
          </div>
        </div>
        <div>
          <label>Confirm password</label>
          <div className={`${styles.inputContainer} ${hasPasswordError ? styles.inputError : ""}`}>
            <IoIosLock />
            <input onChange={setNoError} name="passwordConfirmation" className={message?.type == "password" ? styles.input : `${styles.input} ${styles.inputError}`} type="password" placeholder="At least 8 characters" />
            {message?.type == "password" && <p>{message?.error}</p>}
          </div>
        </div>
        <p>Password must contain at least 8 characters</p>
        <button className={styles.submitBtn} type="submit">Create new account</button>
      </form>
    </>
  )
}