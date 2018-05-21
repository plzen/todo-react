import { isEmpty } from "ramda";
import { SubmissionError } from "redux-form";

import { createStatusActionCreators } from "../shared/status";

import actionTypes from "./actionTypes";
import firebaseService from "../../services/firebase";

import { validateSignInForm, validateSignUpForm } from "./validator";
import { parseSigninErrors, parseSignupErrors } from "../../utils/firebase";

const statusActions = createStatusActionCreators("USER");

const monitorSession = () => (dispatch) => {
  firebaseService.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(userSignedIn(user));
    } else {
      dispatch(userSignedOut());
    }
  });
};

const signinUser = values => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("signin"));

    // Validate form locally
    const errors = validateSignInForm(values);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("signin", submissionError));
    } else {
      firebaseService
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          resolve(user);
          dispatch(statusActions.success("signin"));
        })
        .catch((error) => {
          const parsedError = parseSigninErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(statusActions.error("signin", submissionError));
        });
    }
  });

const signupUser = values => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("signup"));

    // Validate form locally
    const errors = validateSignUpForm(values);
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors);
      reject(submissionError);
      dispatch(statusActions.error("signup", submissionError));
    } else {
      firebaseService
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          resolve(user);
          dispatch(statusActions.success("signup"));
        })
        .catch((error) => {
          const parsedError = parseSignupErrors(error);
          const submissionError = new SubmissionError(parsedError);
          reject(submissionError);
          dispatch(statusActions.error("signup", submissionError));
        });
    }
  });

const signoutUser = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(statusActions.loading("signout"));

    firebaseService
      .auth()
      .signOut()
      .then(() => {
        resolve();
        dispatch(statusActions.success("signout"));
      })
      .catch((error) => {
        reject(error);
        dispatch(statusActions.error("signout", error));
      });
  });

const userSignedIn = user => ({
  type: actionTypes.USER_SIGNED_IN,
  user,
});

const userSignedOut = () => ({
  type: actionTypes.USER_SIGNED_OUT,
});

const userActions = {
  monitorSession,
  signinUser,
  signupUser,
  signoutUser,
};

export { userActions as default };
