import * as validator from "../../validators";

export const validateForm = (fields) => {
  const errors = {};

  const { email, password, confirm_password } = fields;

  if (!validator.required(email)) {
    errors.email = "The field is required";
  } else if (!validator.email(email)) {
    errors.email = "Email is not valid";
  }

  if (!validator.required(password)) {
    errors.password = "The field is required";
  } else if (!validator.password(password)) {
    errors.password =
      "Password does not meet minimal requirements. The length should be 8 characters, alphanumeric";
  }

  if (!validator.required(confirm_password)) {
    errors.confirm_password = "The field is required";
  } else if (
    password &&
    confirm_password &&
    validator.password(password) &&
    !validator.equals(password, confirm_password)
  ) {
    errors.confirm_password = "Password and Confirm password fields doesn’t match";
  }

  return errors;
};
