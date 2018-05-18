import { path } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const getActiveProject = state => path(["projects", "activeProject"], state);
const getEditProject = state => path(["projects", "editProject"], state);

const entitySelectors = createEntitySelectors("projects");
const listSelectors = createStatusSelectors("projects", "list");
const createSelectors = createStatusSelectors("projects", "create");
const removeSelectors = createStatusSelectors("projects", "remove");
const editSelectors = createStatusSelectors("projects", "edit");

const isListLoading = state => listSelectors.isLoading(state);
const isCreateLoading = state => createSelectors.isLoading(state);
const isRemoveLoading = (state, key) => removeSelectors.isLoading(state, key);
const getRemoveError = (state, key) => removeSelectors.getError(state, key);
const isEditLoading = (state, key) => editSelectors.isLoading(state, key);

const projectsSelectors = {
  ...entitySelectors,
  isListLoading,
  isCreateLoading,
  isRemoveLoading,
  getRemoveError,
  isEditLoading,
  getActiveProject,
  getEditProject,
};

export default projectsSelectors;
