import * as validator from "../../validators";

export const validateCreateCommentForm = (fields) => {
  const errors = {};

  const { message } = fields;

  if (!validator.required(message)) {
    errors.message = "The field is required";
  }

  return errors;
};
