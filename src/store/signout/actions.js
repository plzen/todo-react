import * as types from "./actionTypes";
import firebaseService from "../../services/firebase";

export const signoutUser = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(signoutLoading());

    firebaseService
      .auth()
      .signOut()
      .then(() => {
        resolve();
        dispatch(signoutSuccess());
      })
      .catch((error) => {
        reject(error);
        dispatch(signoutError(error));
      });
  });

const signoutLoading = () => ({
  type: types.SIGNOUT_LOADING,
});

const signoutSuccess = () => ({
  type: types.SIGNOUT_SUCCESS,
});

const signoutError = error => ({
  type: types.SIGNOUT_ERROR,
  error,
});
