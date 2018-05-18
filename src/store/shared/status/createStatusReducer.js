import { omit } from "ramda";

import createStatusActionConstants from "./createStatusActionConstants";

const loading = (state, type, key) => {
  if (key) {
    return {
      ...state,
      status: {
        ...state.status,
        [type]: {
          ...state.status[type],
          [key]: {
            loading: true,
            error: null,
          },
        },
      },
    };
  }

  return {
    ...state,
    status: {
      ...state.status,
      [type]: {
        ...state.status[type],
        loading: true,
        error: null,
      },
    },
  };
};

const error = (state, type, e, key) => {
  if (key) {
    return {
      ...state,
      status: {
        ...state.status,
        [type]: {
          ...state.status[type],
          [key]: {
            loading: false,
            error: e,
          },
        },
      },
    };
  }

  return {
    ...state,
    status: {
      ...state.status,
      [type]: {
        loading: false,
        error: e,
      },
    },
  };
};

const success = (state, type, key) => {
  if (key) {
    return {
      ...state,
      status: {
        ...state.status,
        [type]: omit([key], state.status[type]),
      },
    };
  }

  return {
    ...state,
    status: {
      ...state.status,
      [type]: omit(["loading", "error"], state.status[type]),
    },
  };
};

const createStatusReducer = (prefix) => {
  const ActionConstants = createStatusActionConstants(prefix);

  return reducerFun => (state, action) => {
    const payload = action.payload || {};

    switch (action.type) {
      case ActionConstants.LOADING:
        return reducerFun(loading(state, payload.type, payload.key), action);
      case ActionConstants.ERROR:
        return reducerFun(error(state, payload.type, payload.error, payload.key), action);
      case ActionConstants.SUCCESS:
        return reducerFun(success(state, payload.type, payload.key), action);
      default:
        return reducerFun(state, action);
    }
  };
};

export default createStatusReducer;
