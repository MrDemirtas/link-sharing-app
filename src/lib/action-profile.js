"use server";

import { createClient } from "@/utils/supabase/server";

export const getProfile = async () => {
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();

  if (!userData.data.user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.data.user.id)
    .single();

  if (error) {
    return {
      success: false,
      message: "Error getting profile",
      error: error,
    };
  }

  return {
    success: true,
    message: "Profile found",
    data: data,
  };
};

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
      .upload(`${userData.data.user.id}.png`, updatedFields.avatar, {
        cacheControl: "3600",
        upsert: true,
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
      "/storage/v1/object/public/avatars/" +
      data.path;
  }

  const options = {
    first_name: updatedFields.firstName,
    last_name: updatedFields.lastName,
    email: updatedFields.email,
    slug: updatedFields.slug,
  };

  updatedFields.avatar.size !== 0 && (options.img_url = img_url);

  const { data, error } = await supabase
    .from("profiles")
    .update(options)
    .eq("id", userData.data.user.id)
    .select()
    .single();

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
    data: data,
  };
};

export const deleteAvatar = async () => {
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();

  if (!userData.data.user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const { data, error } = await supabase.storage
    .from("avatars")
    .remove([`${userData.data.user.id}.png`]);

  if (error) {
    return {
      success: false,
      message: "Error deleting avatar",
      error: error,
    };
  }

  const { error: errorUpdate } = await supabase
    .from("profiles")
    .update({ img_url: null })
    .eq("id", userData.data.user.id);

  if (errorUpdate) {
    return {
      success: false,
      message: "Error updating profile",
      error: errorUpdate,
    };
  }

  return {
    success: true,
    message: "Avatar deleted successfully",
  };
};
