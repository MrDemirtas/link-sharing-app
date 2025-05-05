import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Link sharing app - Login",
};

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
