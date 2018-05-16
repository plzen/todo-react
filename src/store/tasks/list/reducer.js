import * as types from "./actionTypes";

const initialState = {
  ids: {},
};

const taskList = (state = initialState, action) => {
  switch (action.type) {
    case types.TASK_LIST_LOADING:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: true, error: null } },
      };
    case types.TASK_LIST_SUCCESS:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: false, tasks: action.tasks } },
      };
    case types.TASK_LIST_FAILURE:
      return {
        ...state,
        ids: { ...state.ids, [action.projectId]: { loading: false, error: action.error } },
      };
    default:
      return state;
  }
};

export default taskList;
