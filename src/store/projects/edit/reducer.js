import * as types from "./actionTypes";

const initialState = {
  ids: {},
  activeProject: "",
};

const projectEdit = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_EDIT_LOADING:
      return { ...state, ids: { ...state.ids, [action.key]: { loading: true, error: null } } };
    case types.PROJECT_EDIT_SUCCESS:
      return { ...state, ids: { ...state.ids, [action.key]: { loading: false, error: null } } };
    case types.PROJECT_EDIT_FAILURE:
      return {
        ...state,
        ids: { ...state.ids, [action.key]: { loading: false, error: action.error } },
      };
    case types.PROJECT_EDIT_TOGGLE:
      return { ...state, activeProject: action.key };
    default:
      return state;
  }
};

export default projectEdit;
