"use server";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);
}

export async function signup(currentState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (email.trim() === "") {
    return {
      errorCode: 1,
      message: "Email is required",
    };
  }

  if (password.length < 6) {
    return {
      errorCode: 2,
      message: "Password must be at least 6 characters long",
    };
  }

  if (password !== confirmPassword) {
    return {
      errorCode: 3,
      message: "Passwords do not match",
    };
  }

  console.log(email, password);
  return null;
}
