import { filter } from "ramda";

import { createEntitySelectors } from "../shared/entity";
import { createStatusSelectors } from "../shared/status";

const entitySelectors = createEntitySelectors("comments");
const listSelectors = createStatusSelectors("comments", "list");
const createSelectors = createStatusSelectors("comments", "create");
const removeSelectors = createStatusSelectors("comments", "remove");

const isListLoading = (state, key) => listSelectors.isLoading(state, key);
const getListError = (state, key) => listSelectors.getError(state, key);
const getComments = (state, taskKey) => {
  const comments = entitySelectors.getEntities(state);
  return filter(comment => comment.taskKey === taskKey, comments);
};
const isCreateLoading = (state, key) => createSelectors.isLoading(state, key);
const isRemoveLoading = (state, key) => removeSelectors.isLoading(state, key);
const getRemoveError = (state, key) => removeSelectors.getError(state, key);

const tasksSelectors = {
  ...entitySelectors,
  isListLoading,
  getListError,
  getComments,
  isCreateLoading,
  isRemoveLoading,
  getRemoveError,
};

export default tasksSelectors;
