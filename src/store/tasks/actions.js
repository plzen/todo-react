import { forEachObjIndexed, isEmpty } from "ramda";
import { SubmissionError, reset } from "redux-form";

import makeActionCreator from "../shared/makeActionCreator";
import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import actionTypes from "./actionTypes";
import firebaseService, { TIMESTAMP } from "../../services/firebase";

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
          const tasks = snapshot.val() || {};

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

const createTask = (projectKey, params) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("create", projectKey));

    // Validate form locally
    const errors = validateCreateTaskForm(params);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("create", submissionError, projectKey));
    } else {
      const task = {
        name: params.taskName,
        createdAt: Date(),
        position: TIMESTAMP,
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

const completeTask = (projectKey, key, completed) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("complete", key));

    const task = { completed };

    firebaseService
      .database()
      .ref(`tasks/${projectKey}/${key}`)
      .update(task)
      .then(() => {
        resolve();
        dispatch(entityActions.upsert(key, task));
        dispatch(statusActions.success("complete", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("complete", error, key));
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

const moveUpTask = (projectKey, key) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("move-up", key));

    firebaseService
      .database()
      .ref(`tasks/${projectKey}`)
      .once("value")
      .then((snapshot) => {
        const tasks = snapshot.val() || {};

        const currentTask = tasks[key];

        let prevKey;
        let prevPosition;
        forEachObjIndexed((taskValue, taskKey) => {
          if (
            taskValue.position < currentTask.position &&
            (taskValue.position > prevPosition || prevPosition === undefined)
          ) {
            prevPosition = taskValue.position;
            prevKey = taskKey;
          }
        }, tasks);

        const prevTask = tasks[prevKey];

        prevTask.position = currentTask.position;
        currentTask.position = prevPosition;

        return firebaseService
          .database()
          .ref(`tasks/${projectKey}`)
          .update({ [prevKey]: prevTask, [key]: currentTask })
          .then(() => {
            dispatch(entityActions.upsert(prevKey, prevTask));
            dispatch(entityActions.upsert(key, currentTask));
          });
      })
      .then(() => {
        resolve();
        dispatch(statusActions.success("move-up", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("move-up", error, key));
      });
  });

const moveDownTask = (projectKey, key) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("move-down", key));

    firebaseService
      .database()
      .ref(`tasks/${projectKey}`)
      .once("value")
      .then((snapshot) => {
        const tasks = snapshot.val() || {};

        const currentTask = tasks[key];

        let nextKey;
        let nextPosition;
        forEachObjIndexed((taskValue, taskKey) => {
          if (
            taskValue.position > currentTask.position &&
            (taskValue.position < nextPosition || nextPosition === undefined)
          ) {
            nextPosition = taskValue.position;
            nextKey = taskKey;
          }
        }, tasks);

        const nextTask = tasks[nextKey];

        nextTask.position = currentTask.position;
        currentTask.position = nextPosition;

        return firebaseService
          .database()
          .ref(`tasks/${projectKey}`)
          .update({ [nextKey]: nextTask, [key]: currentTask })
          .then(() => {
            dispatch(entityActions.upsert(nextKey, nextTask));
            dispatch(entityActions.upsert(key, currentTask));
          });
      })
      .then(() => {
        resolve();
        dispatch(statusActions.success("move-down", key));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("move-down", error, key));
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
  completeTask,
  toggleEditTask,
  moveUpTask,
  moveDownTask,
};

export { tasksActions as default };
