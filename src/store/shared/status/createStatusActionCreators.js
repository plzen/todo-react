import createStatusActionConstants from "./createStatusActionConstants";

const createStatusActionCreators = (prefix) => {
  const ActionConstants = createStatusActionConstants(prefix);

  return {
    loading(type, key) {
      return {
        type: ActionConstants.LOADING,
        payload: { type, key },
      };
    },
    error(type, error, key) {
      return {
        type: ActionConstants.ERROR,
        payload: { type, error, key },
      };
    },
    success(type, key) {
      return {
        type: ActionConstants.SUCCESS,
        payload: { type, key },
      };
    },
  };
};

export default createStatusActionCreators;
