import { defaultMemoize, createSelector } from "reselect";
import { map, path, pathOr } from "ramda";

const createEntitySelectors = (sliceKey) => {
  const getById = defaultMemoize(state => pathOr({}, [sliceKey, "byId"], state));

  const getIds = defaultMemoize(state => pathOr([], [sliceKey, "ids"], state));

  const getEntities = createSelector(getById, getIds, (byId, ids) => {
    const asEntity = id => path([id], byId);
    return map(asEntity, ids);
  });

  return {
    getById,
    getIds,
    getEntities,
  };
};

export default createEntitySelectors;
