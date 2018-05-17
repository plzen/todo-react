import { path } from "ramda";

import { createEntitySelectors } from "../shared/entity";

const isLoading = state => path(["projects", "loading"], state);
const getError = state => path(["projects", "error"], state);
const getActiveProject = state => path(["projects", "activeProject"], state);

const baseSelectors = createEntitySelectors("projects");

const projectsSelectors = {
  ...baseSelectors,
  isLoading,
  getError,
  getActiveProject,
};

export { projectsSelectors as default };
