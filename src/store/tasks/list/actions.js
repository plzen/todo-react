import * as types from "./actionTypes";
import firebaseService from "../../../services/firebase";

export const loadTasks = projectId => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(taskListLoading(projectId));

    firebaseService
      .database()
      .ref(`tasks/${projectId}`)
      .on(
        "value",
        (snapshot) => {
          let tasks;
          const val = snapshot.val();
          if (val) {
            tasks = Object.keys(val).map((key) => {
              const task = val[key];
              task.key = key;
              return task;
            });
          } else {
            tasks = [];
          }

          resolve();
          dispatch(taskListSuccess(projectId, tasks));
        },
        (error) => {
          reject(error);
          dispatch(taskListFailure(projectId, error));
        },
      );
  });

export const taskListLoading = projectId => ({
  type: types.TASK_LIST_LOADING,
  projectId,
});

export const taskListSuccess = (projectId, tasks) => ({
  type: types.TASK_LIST_SUCCESS,
  projectId,
  tasks,
});

export const taskListFailure = (projectId, error) => ({
  type: types.TASK_LIST_FAILURE,
  projectId,
  error,
});
