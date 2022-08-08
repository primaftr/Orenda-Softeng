export const validateEmail = (email: string) => {
  if (!email.includes("@")) {
    return { errorMessage: "Invalid email!" };
  }
  if (email.length <= 2) {
    return {
      errorMessage: "Username length must be greater than 2 ",
    };
  }

  return { errorMessage: null };
};
