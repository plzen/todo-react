import { filter, path, reduce, sort } from "ramda";
import { createSelector } from "reselect";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const entitySelectors = createEntitySelectors("tasks");
const listSelectors = createStatusSelectors("tasks", "list");
const createSelectors = createStatusSelectors("tasks", "create");
const editSelectors = createStatusSelectors("tasks", "edit");
const removeSelectors = createStatusSelectors("tasks", "remove");
const completeSelectors = createStatusSelectors("tasks", "complete");
const moveUpSelectors = createStatusSelectors("tasks", "move-up");
const moveDownSelectors = createStatusSelectors("tasks", "move-down");
const deadlineSelectors = createStatusSelectors("tasks", "deadline");

const getEditTask = state => path(["tasks", "editTask"], state);

const isListLoading = (state, key) => listSelectors.isLoading(state, key);
const getListError = (state, key) => listSelectors.getError(state, key);
const getTasks = (state, projectKey) => {
  const tasks = entitySelectors.getEntities(state);
  const filtered = filter(task => task.projectKey === projectKey, tasks);
  return sort((a, b) => a.position - b.position, filtered);
};
const isAllCompleted = createSelector(
  getTasks,
  tasks => tasks.length > 0 && reduce((acc, value) => acc && !!value.completed, true, tasks),
);
const isCreateLoading = (state, key) => createSelectors.isLoading(state, key);
const isEditLoading = (state, key) => editSelectors.isLoading(state, key);

const isRemoveLoading = (state, key) => removeSelectors.isLoading(state, key);
const getRemoveError = (state, key) => removeSelectors.getError(state, key);

const isCompleteLoading = (state, key) => completeSelectors.isLoading(state, key);
const isMoveUpLoading = (state, key) => moveUpSelectors.isLoading(state, key);
const isMoveDownLoading = (state, key) => moveDownSelectors.isLoading(state, key);
const isDeadlineLoading = (state, key) => deadlineSelectors.isLoading(state, key);

const tasksSelectors = {
  ...entitySelectors,
  getEditTask,
  isListLoading,
  getListError,
  getTasks,
  isAllCompleted,
  isCreateLoading,
  isEditLoading,
  isRemoveLoading,
  getRemoveError,
  isCompleteLoading,
  isMoveUpLoading,
  isMoveDownLoading,
  isDeadlineLoading,
};

export default tasksSelectors;
