"use client";

import { createClient } from "@/utils/supabase/client";

export default function SignOutButton() {
  const supabase = createClient();
  return <button onClick={() => supabase.auth.signOut()}>Çıkış ol</button>;
}
