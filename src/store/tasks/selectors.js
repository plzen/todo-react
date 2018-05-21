import { filter, path } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const entitySelectors = createEntitySelectors("tasks");
const listSelectors = createStatusSelectors("tasks", "list");
const createSelectors = createStatusSelectors("tasks", "create");
const editSelectors = createStatusSelectors("tasks", "edit");
const removeSelectors = createStatusSelectors("tasks", "remove");

const getEditTask = state => path(["tasks", "editTask"], state);

const isListLoading = (state, key) => listSelectors.isLoading(state, key);
const getListError = (state, key) => listSelectors.getError(state, key);
const getTasks = (state, projectKey) => {
  const tasks = entitySelectors.getEntities(state);
  return filter(task => task.projectKey === projectKey, tasks);
};
const isCreateLoading = (state, key) => createSelectors.isLoading(state, key);
const isEditLoading = (state, key) => editSelectors.isLoading(state, key);

const isRemoveLoading = (state, key) => removeSelectors.isLoading(state, key);
const getRemoveError = (state, key) => removeSelectors.getError(state, key);

const tasksSelectors = {
  ...entitySelectors,
  getEditTask,
  isListLoading,
  getListError,
  getTasks,
  isCreateLoading,
  isEditLoading,
  isRemoveLoading,
  getRemoveError,
};

export default tasksSelectors;
