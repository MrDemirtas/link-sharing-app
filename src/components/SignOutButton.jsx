"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();
  const handleSubmit = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return <button onClick={handleSubmit}>Çıkış ol</button>;
}
