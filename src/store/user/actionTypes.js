import { createStatusActionConstants } from "../shared/status";

const UserConstants = {
  ...createStatusActionConstants("USER"),
  USER_SIGNED_IN: "USER_SIGNED_IN",
  USER_SIGNED_OUT: "USER_SIGNED_OUT",
};

export default UserConstants;
