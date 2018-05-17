import createEntityActionConstants from "./createEntityActionConstants";

const createEntityActionCreators = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return {
    set(collection, meta) {
      return {
        type: ActionConstants.SET,
        payload: { collection, meta },
      };
    },
  };
};

export default createEntityActionCreators;
