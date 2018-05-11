import * as types from "./actionTypes";

const initialState = {
  ids: {},
};

const projectRemove = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_REMOVE_LOADING:
      return { ...state, ids: { ...state.ids, [action.key]: { loading: true, error: null } } };
    case types.PROJECT_REMOVE_SUCCESS:
      return { ...state, ids: { ...state.ids, [action.key]: { loading: false, error: null } } };
    case types.PROJECT_REMOVE_FAILURE:
      return {
        ...state,
        ids: { ...state.ids, [action.key]: { loading: false, error: action.error } },
      };
    default:
      return state;
  }
};

export default projectRemove;
