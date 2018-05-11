import { path } from "ramda";

export const isLoading = state => path(["projectsList", "loading"], state);
export const getProjects = state => path(["projectsList", "projects"], state);
export const getError = state => path(["projectsList", "error"], state);
export const getActiveProject = state => path(["projectsList", "activeProject"], state);
