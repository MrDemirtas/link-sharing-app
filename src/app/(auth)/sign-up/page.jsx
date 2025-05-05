import Link from "next/link";

export const metadata = {
  title: "Sign Up",
  description: "Link sharing app - Sign Up",
};

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/login">Login</Link>
    </div>
  );
}
