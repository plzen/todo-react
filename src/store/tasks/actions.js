import { map } from "ramda";

import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import firebaseService from "../../services/firebase";

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
          }, snapshot.val());

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

const tasksActions = {
  loadTasks,
};

export { tasksActions as default };
