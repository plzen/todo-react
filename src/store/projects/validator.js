import * as validator from "../../validators";

export const validateCreateProjectForm = (fields) => {
  const errors = {};

  const { projectName } = fields;

  if (!validator.required(projectName)) {
    errors.projectName = "The field is required";
  }

  return errors;
};
