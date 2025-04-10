"use client";

import { login } from "./action";
import styles from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.svg" alt="Logo" />
      </header>

      {isSignUp ? (
        <form className={styles.formMobile}>
          <div className={styles.loginTexts}>
            <h1>Create account</h1>
            <p>Let’s get you started sharing your links!</p>
          </div>
          <div className={styles.formElements}>
            <label>
              Email address
              <input className={styles.mailInput} type="email" placeholder="e.g. alex@email.com" />
            </label>
            <label>
              Password
              <input className={styles.passwordInput} type="password" placeholder="At least .8 characters" />
            </label>
            <label>
              Confirm password
              <input className={styles.passwordInput} type="password" placeholder="At least .8 characters" />
            </label>
            <p className={styles.passwordInfo}>Password must contain at least 8 characters</p>
            <button className={styles.loginButton} type="submit">
              Create new account
            </button>
            <div className={styles.signType}>
              <p>Already have an account?</p>
              <button type="button" onClick={() => setIsSignUp(false)}>
                Login
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form className={styles.formMobile} action={login}>
          <div className={styles.loginTexts}>
            <h1>Login</h1>
            <p>Add your details below to get back into the app</p>
          </div>
          <div className={styles.formElements}>
            <label>
              Email address
              <input className={styles.mailInput} name="email" type="email" placeholder="e.g. alex@email.com" />
            </label>
            <label>
              Password
              <input
                className={styles.passwordInput}
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </label>
            <button className={styles.loginButton} type="submit">
              Login
            </button>
            <div className={styles.signType}>
              <p>Don’t have an account?</p>
              <button type="button" onClick={() => setIsSignUp(true)}>
                Create account
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
