const getValidationMessage = (inputName, isValid) => {
  if (isValid) return "";
  if (inputName === "name")
    return "* Name is required and must be 2-40 characters";
  if (inputName === "imageUrl") return "* Please provide a valid URL";
  return "Invalid input";
};

export { getValidationMessage };
