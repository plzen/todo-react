import { isEmpty } from "ramda";
import { SubmissionError, reset } from "redux-form";

import makeActionCreator from "../shared/makeActionCreator";
import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import actionTypes from "./actionTypes";
import firebaseService from "../../services/firebase";

import { validateCreateProjectForm } from "./validator";
import { parseSigninErrors } from "../../utils/firebase";

const entityActions = createEntityActionCreators("PROJECTS");
const statusActions = createStatusActionCreators("PROJECTS");

const createProject = values => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("create"));

    // Validate form locally
    const errors = validateCreateProjectForm(values);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("create", submissionError));
    } else {
      const project = {
        name: values.projectName,
        createdAt: Date(),
      };
      firebaseService
        .database()
        .ref("projects")
        .push(project)
        .then((ref) => {
          resolve();

          dispatch(entityActions.upsert(ref.key, project));
          dispatch(statusActions.success("create"));
          dispatch(reset("newProjectForm"));
        })
        .catch((error) => {
          const parsedError = parseSigninErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(statusActions.error("create", submissionError));
        });
    }
  });

const loadProjects = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("list"));

    firebaseService
      .database()
      .ref("projects")
      .once(
        "value",
        (snapshot) => {
          const projects = snapshot.val();

          resolve();
          dispatch(entityActions.set(projects));
          dispatch(statusActions.success("list"));
        },
        (error) => {
          reject(error);
          dispatch(statusActions.error("list", error));
        },
      );
  });

const removeProject = key => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("remove", key));

    firebaseService
      .database()
      .ref(`projects/${key}`)
      .remove()
      .then(() => {
        resolve();
        dispatch(entityActions.remove(key));
        dispatch(statusActions.success("remove", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("remove", error, key));
      });
  });

const editProject = params => dispatch =>
  new Promise((resolve, reject) => {
    const { key, projectName } = params;

    dispatch(statusActions.loading("edit", key));

    const project = { name: projectName };

    firebaseService
      .database()
      .ref(`projects/${key}`)
      .update(project)
      .then(() => {
        resolve();
        dispatch(entityActions.upsert(key, project));
        dispatch(toggleEditProject(""));
        dispatch(statusActions.success("edit", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("edit", error, key));
      });
  });

const toggleEditProject = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.projects.editProject === key) {
      dispatch(projectEditToggle(""));
    } else {
      dispatch(projectEditToggle(key));
    }

    resolve();
  });

const toggleProject = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.projects.activeProject === key) {
      dispatch(projectListToggle(""));
    } else {
      dispatch(projectListToggle(key));
    }

    resolve();
  });

const projectListToggle = makeActionCreator(actionTypes.PROJECTS_LIST_TOGGLE, "key");
const projectEditToggle = makeActionCreator(actionTypes.PROJECTS_EDIT_TOGGLE, "key");

const projectsActions = {
  createProject,
  loadProjects,
  removeProject,
  editProject,
  toggleProject,
  toggleEditProject,
};

export { projectsActions as default };
