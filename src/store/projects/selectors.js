import { path } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const getActiveProject = state => path(["projects", "activeProject"], state);

const entitySelectors = createEntitySelectors("projects");
const listSelectors = createStatusSelectors("projects", "list");

const isListLoading = state => listSelectors.isLoading(state);

const projectsSelectors = {
  ...entitySelectors,
  isListLoading,
  getActiveProject,
};

export default projectsSelectors;
