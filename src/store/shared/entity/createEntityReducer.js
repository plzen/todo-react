import { fromPairs, indexOf, keys, map, path } from "ramda";

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

const upsert = (state, id, attributes) => ({
  ...state,
  byId: {
    ...(state.byId || {}),
    [id]: {
      ...attributes,
      key: id,
    },
  },
  ids: indexOf(id, state.ids) > -1 ? state.ids : (state.ids || []).concat(id),
});

const createEntityReducer = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return reducerFun => (state, action) => {
    const payload = action.payload || {};

    switch (action.type) {
      case ActionConstants.SET:
        return reducerFun(set(state, payload.list), action);
      case ActionConstants.UPSERT:
        return reducerFun(upsert(state, payload.id, payload.attributes), action);
      default:
        return reducerFun(state, action);
    }
  };
};

export default createEntityReducer;
