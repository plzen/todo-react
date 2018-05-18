import { createEntityActionConstants } from "../shared/entity";
import { createStatusActionConstants } from "../shared/status";

const ProjectsConstants = {
  ...createEntityActionConstants("PROJECTS"),
  ...createStatusActionConstants("PROJECTS"),
  PROJECTS_LIST_TOGGLE: "PROJECTS_LIST_TOGGLE",
  PROJECTS_EDIT_TOGGLE: "PROJECTS_EDIT_TOGGLE",
};

export default ProjectsConstants;
