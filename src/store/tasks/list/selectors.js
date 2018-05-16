import { path, pathOr } from "ramda";
import { createSelector } from "reselect";

const getProjectKey = (state, props) => path(["project", "key"], props);
const getIds = state => path(["tasksList", "ids"], state);

export const isLoading = createSelector(getProjectKey, getIds, (key, ids) =>
  pathOr(false, [key, "loading"], ids));
export const getTasks = createSelector(getProjectKey, getIds, (key, ids) =>
  pathOr([], [key, "tasks"], ids));
export const getError = createSelector(getProjectKey, getIds, (key, ids) =>
  pathOr(null, [key, "error"], ids));
