"use server";

import { createClient } from "../utils/supabase/server";

export async function getPlatforms() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("platforms").select("*");
  return data;
}

export async function getLinks() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.data.user.id)
    .order("sequence", { ascending: true });
  return data;
}

export async function deleteLinkAction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function insertLinks(newLinks) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .insert(newLinks)
    .select();
}

export async function updateLinks(links) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .upsert(links, {
      onConflict: "id",
      defaultToNull: false,
    })
    .select();

  if (error) {
    console.error("Error:", error);
    throw error;
  }
}
