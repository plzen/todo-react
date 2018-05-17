import { fromPairs, keys, map, path } from "ramda";

import createEntityActionConstants from "./createEntityActionConstants";

const getEntityWithKey = (key, byId) => {
  const model = path([key], byId);
  model.key = key;
  return model;
};

const asById = byId => fromPairs(map(key => [key, getEntityWithKey(key, byId)], keys(byId)));

const asIds = byId => keys(byId);

const set = (state, collection) => ({
  ...state,
  byId: asById(collection),
  ids: asIds(collection),
});

const createEntityReducer = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return reducerFun => (state, action) => {
    const payload = action.payload || {};

    switch (action.type) {
      case ActionConstants.SET:
        return reducerFun(set(state, payload.collection), action);
      default:
        return reducerFun(state, action);
    }
  };
};

export default createEntityReducer;
