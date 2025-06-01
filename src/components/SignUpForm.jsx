"use client";

import { useActionState, useEffect, useState } from "react";

import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import signUp from "@/lib/action-signup";
import styles from "@/styles/signup.module.css";

export default function SignUpForm() {
  const [message, formAction, isPending] = useActionState(signUp, null);
  const [warning, setWarning] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (message?.error && message?.type == "email") {
      setHasEmailError(true);
    } else if (message?.error && message?.type == "password") {
      setHasPasswordError(true);
    }
  }, [message]);

  function setNoError(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setHasEmailError(false);
    } else if (name === "password") {
      setPassword(value);
      setHasPasswordError(false);
    } else if (name === "passwordConfirmation") {
      setConfirmPassword(value);
      setHasPasswordError(false);
    }
  }

  return (
    <form action={formAction} className={styles.form} autoComplete="off">
      <label>
        <span>Email address</span>
        <div
          className={`${styles.inputContainer} ${
            hasEmailError ? styles.inputError : ""
          }`}
        >
          <MdEmail />
          <input
            onChange={setNoError}
            name="email"
            className={styles.input}
            type="email"
            placeholder="e.g. alex@email.com"
            value={email}
            required
          />
          {message?.type == "email" && <p>{message?.error}</p>}
        </div>
      </label>

      <label>
        <span>Create password</span>
        <div
          className={`${styles.inputContainer} ${
            hasPasswordError ? styles.inputError : ""
          }`}
        >
          <IoIosLock />
          <input
            onChange={setNoError}
            name="password"
            className={styles.input}
            type="password"
            placeholder="At least 8 characters"
            value={password}
            required
          />
          {message?.type == "password" && <p>{message?.error}</p>}
        </div>
      </label>

      <label>
        <span>Confirm password</span>
        <div
          className={`${styles.inputContainer} ${
            hasPasswordError ? styles.inputError : ""
          }`}
        >
          <IoIosLock />
          <input
            onChange={setNoError}
            name="passwordConfirmation"
            className={styles.input}
            type="password"
            placeholder="At least 8 characters"
            value={confirmPassword}
            required
          />
          {message?.type == "password" && <p>{message?.error}</p>}
        </div>
      </label>

      <p className={styles.passwordHint}>
        Password must contain at least 8 characters
      </p>

      <button className={styles.submitBtn} type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create new account"}
      </button>
    </form>
  );
}
