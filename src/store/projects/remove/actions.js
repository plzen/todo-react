import * as types from "./actionTypes";
import firebaseService from "../../../services/firebase";

export const removeProject = key => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(projectRemoveLoading(key));

    firebaseService
      .database()
      .ref(`projects/${key}`)
      .remove()
      .then(() => {
        resolve();
        dispatch(projectRemoveSuccess(key));
      })
      .catch((error) => {
        reject(error);
        dispatch(projectRemoveFailure(key, error));
      });
  });

export const projectRemoveLoading = key => ({
  type: types.PROJECT_REMOVE_LOADING,
  key,
});

export const projectRemoveSuccess = key => ({
  type: types.PROJECT_REMOVE_SUCCESS,
  key,
});

export const projectRemoveFailure = (key, error) => ({
  type: types.PROJECT_REMOVE_FAILURE,
  key,
  error,
});
