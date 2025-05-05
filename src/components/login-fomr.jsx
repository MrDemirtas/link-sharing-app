"use client";

import { FiKey, FiMail } from "react-icons/fi";

import styles from "@/styles/login.module.css";

export default function LoginForm() {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>
      <form className={styles.form}>
        <label>
          <span>Email</span>
          <div>
            <FiMail color="#737373" />
            <input type="email" placeholder="e.g. alex@email.com" />
          </div>
        </label>
        <label>
          <span>Password</span>
          <div>
            <FiKey color="#737373" />
            <input type="password" placeholder="Enter your password" />
          </div>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
