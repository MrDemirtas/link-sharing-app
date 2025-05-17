import PreviewHeader from "@/components/PreviewHeader";
import ProfileLinks from "@/components/ProfileLinks";
import checkUserSession from "@/utils/check-user-session";

export default async function Preview() {
  const profileData = await checkUserSession();
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/api/profile/${profileData.id}`;

  const { data } = await fetch(url).then((r) => r.json());

  return (
    <>
      <PreviewHeader slug={data.slug} />
      <ProfileLinks data={data} />
      <div className="purple-bg"></div>
    </>
  );
}
