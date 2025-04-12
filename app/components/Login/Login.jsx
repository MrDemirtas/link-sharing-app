"use client";

import { login, signup } from "./action";
import { useActionState, useState } from "react";

import styles from "./Login.module.css";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupState, signupAction, pending] = useActionState(signup, null);

  console.log(signupState);
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await signupAction(formData);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.svg" alt="Logo" />
      </header>

      {isSignUp ? (
        <form className={styles.formMobile} onSubmit={handleSignupSubmit}>
          <div className={styles.loginTexts}>
            <h1>Create account</h1>
            <p>Let’s get you started sharing your links!</p>
          </div>
          <div className={styles.formElements}>
            <label>
              Email address
              <input
                className={styles.mailInput + " " + (signupState?.errorCode === 1 ? styles.invalid : "")}
                // required
                name="email"
                type="email"
                placeholder="e.g. alex@email.com"
              />
            </label>
            <label>
              Password
              <input
                className={styles.passwordInput + " " + (signupState?.errorCode === 2 ? styles.invalid : "")}
                // required
                name="password"
                type="password"
                placeholder="At least .8 characters"
              />
            </label>
            <label>
              Confirm password
              <input
                className={styles.passwordInput + " " + (signupState?.errorCode === 3 ? styles.invalid : "")}
                // required
                name="confirmPassword"
                type="password"
                placeholder="At least .8 characters"
              />
            </label>
            <p className={styles.passwordInfo}>Password must contain at least 8 characters</p>
            <button className={styles.loginButton} disabled={pending} type="submit">
              Create new account
            </button>
            {signupState && <p className={styles.errorMessage}>{signupState.message}</p>}
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
