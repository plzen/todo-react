import * as validator from "../../../validators";

export const validateForm = (fields) => {
  const errors = {};

  const { taskName } = fields;

  if (!validator.required(taskName)) {
    errors.taskName = "The field is required";
  }

  return errors;
};
