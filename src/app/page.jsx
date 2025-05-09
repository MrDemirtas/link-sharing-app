import checkUserSession from "@/utils/check-user-session";
import { redirect } from "next/navigation";

export default async function Home() {
  await checkUserSession();
  redirect("/links");

  return (
    <>
      {/* <p>Hello {data.user.email}</p>
      <SignOutButton /> */}
    </>
  );
}
