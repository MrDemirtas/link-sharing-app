import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export default async function getPlatforms() {
  let { data, error } = await supabase.from("platforms").select("*");
  return data;
}

export async function getLinks() {
  let { data, error } = await supabase.from("links").select("*");
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
  console.log(error);
}

export async function updateLinks(link) {
  const { data, error } = await supabase
    .from("links")
    .update({ platform_id: link.platform_id, url: link.url })
    .eq("id", link.id)
    .select();
}
