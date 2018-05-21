import { createStatusReducer } from "../shared/status";
import actionTypes from "./actionTypes";

const initialState = {
  restoring: true,
  status: {},
  user: null,
};

const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNED_IN:
      return { ...state, restoring: false, user: action.user };
    case actionTypes.USER_SIGNED_OUT:
      return { ...state, restoring: false, user: null };
    default:
      return state;
  }
};

const userReducer = createStatusReducer("USER")(baseReducer);

export default userReducer;
