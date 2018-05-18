import createEntityActionConstants from "./createEntityActionConstants";

const createEntityActionCreators = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return {
    set(list, meta) {
      return {
        type: ActionConstants.SET,
        payload: { list, meta },
      };
    },
    upsert(key, attributes, meta) {
      return {
        type: ActionConstants.UPSERT,
        payload: { key, attributes, meta },
      };
    },
    remove(key, meta) {
      return {
        type: ActionConstants.REMOVE,
        payload: { key, meta },
      };
    },
  };
};

export default createEntityActionCreators;
