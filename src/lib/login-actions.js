"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createAccount = async (currentState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email.trim() === "") {
    return {
      success: false,
      message: "Email required",
      error: ["email"],
    };
  } else if (password.trim() === "") {
    return {
      success: false,
      message: "Password required",
      error: ["password"],
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
        error: ["email", "password"],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message,
      error: ["email", "password"],
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
