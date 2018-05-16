import * as types from "./actionTypes";

const initialState = {
  ids: {},
};

const taskCreate = (state = initialState, action) => {
  switch (action.type) {
    case types.TASK_CREATE_LOADING:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: true, error: null } },
      };
    case types.TASK_CREATE_SUCCESS:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: false, error: null } },
      };
    case types.TASK_CREATE_FAILURE:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: false, error: action.error } },
      };
    default:
      return state;
  }
};

export default taskCreate;
