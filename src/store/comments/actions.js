// import { isEmpty } from "ramda";
// import { SubmissionError, reset } from "redux-form";

import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import firebaseService from "../../services/firebase";

// import { validateCreateTaskForm } from "./validator";

// import { parseErrors } from "../../utils/firebase";

const entityActions = createEntityActionCreators("COMMENTS");
const statusActions = createStatusActionCreators("COMMENTS");

export const loadComments = key => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("list", key));

    firebaseService
      .database()
      .ref(`comments/${key}`)
      .once(
        "value",
        (snapshot) => {
          const comments = snapshot.val() || {};

          resolve();
          dispatch(entityActions.merge(comments));
          dispatch(statusActions.success("list", key));
        },
        (error) => {
          reject(error);
          dispatch(statusActions.error("list", error, key));
        },
      );
  });

// const createTask = (projectKey, params) => dispatch =>
//   new Promise((resolve, reject) => {
//     dispatch(statusActions.loading("create", projectKey));

//     // Validate form locally
//     const errors = validateCreateTaskForm(params);
//     if (!isEmpty(errors)) {
//       const submissionError = new SubmissionError(errors);
//       reject(submissionError);
//       dispatch(statusActions.error("create", submissionError, projectKey));
//     } else {
//       const task = {
//         name: params.taskName,
//         createdAt: Date(),
//         position: TIMESTAMP,
//         projectKey,
//       };
//       firebaseService
//         .database()
//         .ref(`tasks/${projectKey}`)
//         .push(task)
//         .then((ref) => {
//           resolve();
//           dispatch(entityActions.upsert(ref.key, task));
//           dispatch(statusActions.success("create", projectKey));
//           dispatch(reset("newTaskForm"));
//         })
//         .catch((error) => {
//           const parsedError = parseErrors(error);
//           const submissionError = new SubmissionError(parsedError);
//           reject(submissionError);
//           dispatch(statusActions.error("create", submissionError, projectKey));
//         });
//     }
//   });

// const removeTask = (projectKey, key) => dispatch =>
//   new Promise((resolve, reject) => {
//     dispatch(statusActions.loading("remove", key));

//     firebaseService
//       .database()
//       .ref(`tasks/${projectKey}/${key}`)
//       .remove()
//       .then(() => {
//         resolve();
//         dispatch(entityActions.remove(key));
//         dispatch(statusActions.success("remove", key));
//       })
//       .catch((error) => {
//         reject(error);
//         dispatch(statusActions.error("remove", error, key));
//       });
//   });

const commentsActions = {
  loadComments,
};

export { commentsActions as default };
