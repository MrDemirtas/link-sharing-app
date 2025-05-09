"use client";

import { FiKey, FiMail } from "react-icons/fi";
import { useActionState, useEffect, useState } from "react";

import { createAccount } from "@/lib/action-login";
import styles from "@/styles/login.module.css";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(createAccount, null);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.error?.includes("email")) {
      setIsInvalidEmail(true);
    } else if (state?.error?.includes("password")) {
      setIsInvalidPassword(true);
    }
  }, [state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

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
              value={email}
              onChange={onChange}
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
              value={password}
              onChange={onChange}
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
