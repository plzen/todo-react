import { pathOr } from "ramda";
import { createSelector } from "reselect";

import { createStatusSelectors } from "../shared/status";

const signinSelectors = createStatusSelectors("user", "signin");
const signupSelectors = createStatusSelectors("user", "signup");
const signoutSelectors = createStatusSelectors("user", "signout");

const isRestoring = state => pathOr(false, ["user", "restoring"], state);
const getUser = state => pathOr(null, ["user", "user"], state);
const isLoggedIn = createSelector(getUser, user => user !== null);

const isSigningIn = state => signinSelectors.isLoading(state);
const isSigningUp = state => signupSelectors.isLoading(state);
const isSigningOut = state => signoutSelectors.isLoading(state);

const userSelectors = {
  isRestoring,
  getUser,
  isLoggedIn,
  isSigningIn,
  isSigningUp,
  isSigningOut,
};

export default userSelectors;
