"use client";

import { FiKey, FiMail } from "react-icons/fi";

import { createAccount } from "@/lib/login-actions";
import styles from "@/styles/login.module.css";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(createAccount, null);

  const isInvalidEmail = state?.error?.includes("email");
  const isInvalidPassword = state?.error?.includes("password");

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>
      <form action={formAction} className={styles.form}>
        <label>
          <span className={isInvalidEmail ? styles.invalidSpan : ""}>
            Email Address
          </span>
          <div className={isInvalidEmail ? styles.invalidInput : ""}>
            <FiMail color="#737373" />
            <input
              required
              type="email"
              name="email"
              placeholder="e.g. alex@email.com"
            />
            {isInvalidEmail && <p>{state?.message}</p>}
          </div>
        </label>
        <label>
          <span>Password</span>
          <div className={isInvalidPassword ? styles.invalidInput : ""}>
            <FiKey color="#737373" />
            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            {isInvalidPassword && <p>{state?.message}</p>}
          </div>
        </label>
        <button disabled={pending} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
