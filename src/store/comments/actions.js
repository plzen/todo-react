import { isEmpty } from "ramda";
import { SubmissionError, reset } from "redux-form";

import { createEntityActionCreators } from "../shared/entity";
import { createStatusActionCreators } from "../shared/status";

import firebaseService from "../../services/firebase";

import { validateCreateCommentForm } from "./validator";

import { parseErrors } from "../../utils/firebase";

const tasksEntityActions = createEntityActionCreators("TASKS");
const commentsEntityActions = createEntityActionCreators("COMMENTS");
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
          dispatch(commentsEntityActions.merge(comments));
          dispatch(statusActions.success("list", key));
        },
        (error) => {
          reject(error);
          dispatch(statusActions.error("list", error, key));
        },
      );
  });

const createComment = (projectKey, taskKey, params) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("create", taskKey));

    // Validate form locally
    const errors = validateCreateCommentForm(params);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("create", submissionError, taskKey));
    } else {
      const comment = {
        message: params.message,
        createdAt: Date(),
        projectKey,
        taskKey,
      };
      firebaseService
        .database()
        .ref(`comments/${taskKey}`)
        .push(comment)
        .then((ref) => {
          dispatch(commentsEntityActions.upsert(ref.key, comment));

          return firebaseService
            .database()
            .ref(`tasks/${projectKey}/${taskKey}`)
            .once("value", (snapshot) => {
              const task = snapshot.val();
              const currentCount = task.commentsCount || 0;
              const updateTask = { commentsCount: currentCount + 1 };

              return firebaseService
                .database()
                .ref(`tasks/${projectKey}/${taskKey}`)
                .update(updateTask)
                .then(() => {
                  resolve();

                  dispatch(tasksEntityActions.upsert(taskKey, updateTask));

                  dispatch(statusActions.success("create", taskKey));
                  dispatch(reset("newCommentForm"));
                });
            });
        })
        .catch((error) => {
          const parsedError = parseErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(statusActions.error("create", submissionError, taskKey));
        });
    }
  });

const uploadComment = (projectKey, taskKey, file) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("create", taskKey));

    firebaseService
      .storage()
      .ref()
      .child(`${new Date().getTime()}`)
      .put(file)
      .then((snapshot) => {
        const comment = {
          image: snapshot.downloadURL,
          createdAt: Date(),
          projectKey,
          taskKey,
        };
        return firebaseService
          .database()
          .ref(`comments/${taskKey}`)
          .push(comment)
          .then((ref) => {
            dispatch(commentsEntityActions.upsert(ref.key, comment));

            return firebaseService
              .database()
              .ref(`tasks/${projectKey}/${taskKey}`)
              .once("value", (taskSnapshot) => {
                const task = taskSnapshot.val();
                const currentCount = task.commentsCount || 0;
                const updateTask = { commentsCount: currentCount + 1 };

                return firebaseService
                  .database()
                  .ref(`tasks/${projectKey}/${taskKey}`)
                  .update(updateTask)
                  .then(() => {
                    resolve();

                    dispatch(tasksEntityActions.upsert(taskKey, updateTask));

                    dispatch(statusActions.success("create", taskKey));
                    dispatch(reset("newCommentForm"));
                  });
              });
          });
      })
      .catch((error) => {
        const parsedError = parseErrors(error);
        const submissionError = new SubmissionError(parsedError);
        reject(submissionError);
        dispatch(statusActions.error("create", submissionError, taskKey));
      });
  });

const removeComment = (projectKey, taskKey, key) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("remove", key));

    firebaseService
      .database()
      .ref(`comments/${taskKey}/${key}`)
      .remove()
      .then(() => {
        dispatch(commentsEntityActions.remove(key));

        return firebaseService
          .database()
          .ref(`tasks/${projectKey}/${taskKey}`)
          .once("value", (snapshot) => {
            const task = snapshot.val();
            const currentCount = task.commentsCount || 0;
            const updateTask = { commentsCount: currentCount - 1 };

            return firebaseService
              .database()
              .ref(`tasks/${projectKey}/${taskKey}`)
              .update(updateTask)
              .then(() => {
                resolve();

                dispatch(tasksEntityActions.upsert(taskKey, updateTask));
                dispatch(statusActions.success("remove", taskKey));
              });
          });
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("remove", error, key));
      });
  });

const commentsActions = {
  loadComments,
  createComment,
  removeComment,
  uploadComment,
};

export { commentsActions as default };
