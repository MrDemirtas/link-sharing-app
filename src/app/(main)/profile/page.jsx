import checkUserSession from "@/utils/check-user-session";

export default async function Profile() {
  await checkUserSession();

  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
