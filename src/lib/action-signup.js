"use server";

import { supabase } from "@/supabase/supabase-client";

export default async function signUp(prevState, queryData) {
  const email = queryData.get("email");
  const password = queryData.get("password");
  const passwordConfirmation = queryData.get("passwordConfirmation");

  if (email.trim() === "") {
    return {
      success: false,
      error: "Can't be empty",
      type: "email",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      error: "Passwords don't match",
      type: "password",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Should be longer than 8",
      type: "password",
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}
