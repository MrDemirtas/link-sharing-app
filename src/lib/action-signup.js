"use server";

export default async function signUp(prevState, queryData) {
  const email = queryData.get("email");
  const password = queryData.get("password");
  const passwordConfirmation = queryData.get("passwordConfirmation");

  if (email.trim() === "") {
    return {
      success: false,
      error: "Email can't be empty",
      type: "email"
    }
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      error: "Passwords don't match",
      type: "password"
    }
  } 

  if (password.length < 8) {
    return {
      success: false,
      error: "Password should be longer than 8 characters",
      type: "password"
    }
  } 


}