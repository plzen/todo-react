import { isEmpty, map } from "ramda";
import { SubmissionError, reset } from "redux-form";

import makeActionCreator from "../shared/makeActionCreator";
import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import actionTypes from "./actionTypes";
import firebaseService from "../../services/firebase";

import { validateCreateTaskForm } from "./validator";

import { parseErrors } from "../../utils/firebase";

const entityActions = createEntityActionCreators("TASKS");
const statusActions = createStatusActionCreators("TASKS");

export const loadTasks = key => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("list", key));

    firebaseService
      .database()
      .ref(`tasks/${key}`)
      .once(
        "value",
        (snapshot) => {
          const tasks = map((task) => {
            const newTask = task;
            newTask.projectKey = key;
            return task;
          }, snapshot.val() || {});

          resolve();
          dispatch(entityActions.merge(tasks));
          dispatch(statusActions.success("list", key));
        },
        (error) => {
          reject(error);
          dispatch(statusActions.error("list", error, key));
        },
      );
  });

const createTask = (projectKey, values) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("create", projectKey));

    // Validate form locally
    const errors = validateCreateTaskForm(values);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("create", submissionError, projectKey));
    } else {
      const task = {
        name: values.taskName,
        createdAt: Date(),
        projectKey,
      };
      firebaseService
        .database()
        .ref(`tasks/${projectKey}`)
        .push(task)
        .then((ref) => {
          resolve();
          dispatch(entityActions.upsert(ref.key, task));
          dispatch(statusActions.success("create", projectKey));
          dispatch(reset("newTaskForm"));
        })
        .catch((error) => {
          const parsedError = parseErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(statusActions.error("create", submissionError, projectKey));
        });
    }
  });

const editTask = params => dispatch =>
  new Promise((resolve, reject) => {
    const { projectKey, key, taskName } = params;

    dispatch(statusActions.loading("edit", key));

    const task = { name: taskName };

    firebaseService
      .database()
      .ref(`tasks/${projectKey}/${key}`)
      .update(task)
      .then(() => {
        resolve();
        dispatch(entityActions.upsert(key, task));
        dispatch(toggleEditTask(""));
        dispatch(statusActions.success("edit", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("edit", error, key));
      });
  });

const removeTask = (projectKey, key) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("remove", key));

    firebaseService
      .database()
      .ref(`tasks/${projectKey}/${key}`)
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

const toggleEditTask = key => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    if (state.tasks.editTask === key) {
      dispatch(taskEditToggle(""));
    } else {
      dispatch(taskEditToggle(key));
    }

    resolve();
  });

const taskEditToggle = makeActionCreator(actionTypes.TASKS_EDIT_TOGGLE, "key");

const tasksActions = {
  loadTasks,
  createTask,
  editTask,
  removeTask,
  toggleEditTask,
};

export { tasksActions as default };
