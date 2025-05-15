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
    .eq("user_id", user.data.user.id);
  return data;
}

export async function deleteLinkAction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("links").delete().eq("id", id);
}

export async function insertLinks(newLinks) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .insert(newLinks)
    .select();
}

export async function updateLinks(link) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("links")
    .update({ platform_id: link.platform_id, url: link.url })
    .eq("id", link.id)
    .select();

  if (error) {
    console.error("Error:", error);
    throw error;
  }
}
