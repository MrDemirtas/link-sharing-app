"use server";

import { createClient } from "@/utils/supabase/server";

export const updateProfile = async (currentState, formData) => {
  const updatedFields = Object.fromEntries(formData);
  const supabase = await createClient();
  let img_url = null;

  const userData = await supabase.auth.getUser();

  if (!userData.data.user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (updatedFields.avatar.size !== 0) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${crypto.randomUUID()}.png`, updatedFields.avatar, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return {
        success: false,
        message: "Error uploading avatar",
        error: error,
      };
    }

    img_url =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      "storage/v1/object/public/avatars/" +
      data.path;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: updatedFields.firstName,
      last_name: updatedFields.lastName,
      email: updatedFields.email,
      img_url,
    })
    .eq("id", userData.data.user.id);

  if (error) {
    return {
      success: false,
      message: "Error updating profile",
      error: error,
    };
  }

  return {
    success: true,
    message: "Profile updated successfully",
  };
};
