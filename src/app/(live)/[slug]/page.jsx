import ProfileLinks from "@/components/ProfileLinks";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/api/profile/${slug}`;

  const { data } = await fetch(url).then((r) => r.json());
  if (!data) {
    notFound();
  }

  return (
    <>
      <ProfileLinks data={data} />
      <div className="purple-bg"></div>
    </>
  );
}
