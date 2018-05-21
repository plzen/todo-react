import { isEmpty, map } from "ramda";
import { SubmissionError, reset } from "redux-form";

import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

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

const tasksActions = {
  loadTasks,
  createTask,
};

export { tasksActions as default };
