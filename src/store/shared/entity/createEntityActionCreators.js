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
    upsert(id, attributes, meta) {
      return {
        type: ActionConstants.UPSERT,
        payload: { id, attributes, meta },
      };
    },
  };
};

export default createEntityActionCreators;
