"use server";

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

  return {
    success: true,
    message: "Account created",
  };
};
