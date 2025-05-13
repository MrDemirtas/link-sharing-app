import { isUUID } from "@/utils/is-uuid";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;
  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("*, links(*, platform:platforms(name))");

  if (isUUID(slug)) {
    query = query.eq("id", slug);
  } else {
    query = query.eq("slug", slug);
  }

  let { data: profile, error } = await query.single();

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Success",
    data: profile,
  });
}
