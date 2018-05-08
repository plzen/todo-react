import * as validator from "../../validators";

export const validateForm = (fields) => {
  const errors = {};

  const { email, password } = fields;

  if (!validator.required(email)) {
    errors.email = "The field is required";
  } else if (!validator.email(email)) {
    errors.email = "Email is not valid";
  }

  if (!validator.required(password)) {
    errors.password = "The field is required";
  }

  return errors;
};
