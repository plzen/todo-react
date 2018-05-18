import { filter } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const entitySelectors = createEntitySelectors("tasks");
const listSelectors = createStatusSelectors("tasks", "list");

const isListLoading = (state, key) => listSelectors.isLoading(state, key);
const getListError = (state, key) => listSelectors.getError(state, key);
const getTasks = (state, projectKey) => {
  const tasks = entitySelectors.getEntities(state);
  return filter(task => task.projectKey === projectKey, tasks);
};

const tasksSelectors = {
  ...entitySelectors,
  isListLoading,
  getListError,
  getTasks,
};

export default tasksSelectors;
