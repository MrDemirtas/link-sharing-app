"use server";

import { createClient } from "../utils/supabase/server";

const supabase = createClient();

export default async function getPlatforms() {
  let { data, error } = await supabase.from("platforms").select("*");
  return data;
}

export async function getLinks() {
  const user = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.data.user.id);
  return data;
}

export async function deleteLinkAction(id) {
  const { error } = await supabase.from("links").delete().eq("id", id);
}

export async function insertLinks(newLinks) {
  const { data, error } = await supabase
    .from("links")
    .insert(newLinks)
    .select();
}

export async function updateLinks(link) {
  const { data, error } = await supabase
    .from("links")
    .update({ platform_id: link.platform_id, url: link.url })
    .eq("id", link.id)
    .select();
}
