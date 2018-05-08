import * as types from "./actionTypes";

const initialState = {
  restoring: true,
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SIGNED_IN:
      return { restoring: false, user: action.user };
    case types.USER_SIGNED_OUT:
      return { restoring: false, user: null };
    default:
      return state;
  }
};

export default user;
