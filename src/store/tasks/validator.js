import * as validator from "../../validators";

export const validateCreateTaskForm = (fields) => {
  const errors = {};

  const { taskName } = fields;

  if (!validator.required(taskName)) {
    errors.taskName = "The field is required";
  }

  return errors;
};
