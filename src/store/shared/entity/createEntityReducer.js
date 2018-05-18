import { fromPairs, indexOf, keys, map, omit, path, uniq, without } from "ramda";

import createEntityActionConstants from "./createEntityActionConstants";

const getEntityWithKey = (key, byId) => {
  const model = path([key], byId);
  model.key = key;
  return model;
};

const asById = byId => fromPairs(map(key => [key, getEntityWithKey(key, byId)], keys(byId)));

const asIds = byId => keys(byId);

const set = (state, list) => ({
  ...state,
  byId: asById(list),
  ids: asIds(list),
});

const merge = (state, list) => ({
  ...state,
  byId: {
    ...(state.byId || {}),
    ...asById(list),
  },
  ids: uniq((state.ids || []).concat(asIds(list))),
});

const upsert = (state, key, attributes) => ({
  ...state,
  byId: {
    ...(state.byId || {}),
    [key]: {
      ...state.byId[key],
      ...attributes,
      key,
    },
  },
  ids: indexOf(key, state.ids) > -1 ? state.ids : (state.ids || []).concat(key),
});

const remove = (state, key) => ({
  ...state,
  byId: omit([key], state.byId),
  ids: without([key], state.ids),
});

const createEntityReducer = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return reducerFun => (state, action) => {
    const payload = action.payload || {};

    switch (action.type) {
      case ActionConstants.SET:
        return reducerFun(set(state, payload.list), action);
      case ActionConstants.MERGE:
        return reducerFun(merge(state, payload.list), action);
      case ActionConstants.UPSERT:
        return reducerFun(upsert(state, payload.key, payload.attributes), action);
      case ActionConstants.REMOVE:
        return reducerFun(remove(state, payload.key), action);
      default:
        return reducerFun(state, action);
    }
  };
};

export default createEntityReducer;
