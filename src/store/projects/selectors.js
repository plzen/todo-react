import { path } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const getActiveProject = state => path(["projects", "activeProject"], state);

const entitySelectors = createEntitySelectors("projects");
const listSelectors = createStatusSelectors("projects", "list");
const createSelectors = createStatusSelectors("projects", "create");
const removeSelectors = createStatusSelectors("projects", "remove");

const isListLoading = state => listSelectors.isLoading(state);
const isCreateLoading = state => createSelectors.isLoading(state);
const isRemoveLoading = (state, props) => removeSelectors.isLoading(state, props);
const getRemoveError = (state, props) => removeSelectors.getError(state, props);

const projectsSelectors = {
  ...entitySelectors,
  isListLoading,
  isCreateLoading,
  isRemoveLoading,
  getRemoveError,
  getActiveProject,
};

export default projectsSelectors;
