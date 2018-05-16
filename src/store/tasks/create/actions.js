import * as types from "./actionTypes";
import firebaseService from "../../../services/firebase";

import { SubmissionError, reset } from "redux-form";

import { validateForm } from "./validator";

import { isEmpty } from "../../../utils";
import { parseSigninErrors } from "../../../utils/firebase";

export const createTask = (projectId, values) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(taskCreateLoading(projectId));

    // Validate form locally
    const errors = validateForm(values);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(taskCreateFailure(projectId, submissionError));
    } else {
      const task = {
        name: values.taskName,
        createdAt: Date(),
      };
      firebaseService
        .database()
        .ref(`tasks/${projectId}`)
        .push()
        .set(task)
        .then(() => {
          resolve();
          dispatch(taskCreateSuccess(projectId));
          dispatch(reset("newTaskForm"));
        })
        .catch((error) => {
          const parsedError = parseSigninErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(taskCreateFailure(submissionError));
        });
    }
  });

export const taskCreateLoading = projectId => ({
  type: types.TASK_CREATE_LOADING,
  projectId,
});

export const taskCreateSuccess = projectId => ({
  type: types.TASK_CREATE_SUCCESS,
  projectId,
});

export const taskCreateFailure = (projectId, error) => ({
  type: types.TASK_CREATE_FAILURE,
  projectId,
  error,
});
