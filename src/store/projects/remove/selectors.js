import { path, pathOr } from "ramda";
import { createSelector } from "reselect";

const getProjectKey = (state, props) => path(["project", "key"], props);
const getIds = state => path(["projectsRemove", "ids"], state);

export const isLoading = createSelector(getProjectKey, getIds, (key, ids) =>
  pathOr(false, [key, "loading"], ids));
export const getError = createSelector(getProjectKey, getIds, (key, ids) =>
  pathOr(null, [key, "error"], ids));
