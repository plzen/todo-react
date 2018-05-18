import { defaultMemoize } from "reselect";
import { pathOr } from "ramda";

const createStatusSelectors = (sliceKey, action) => {
  const getPath = (type, key) =>
    (key ? [sliceKey, "status", action, key, type] : [sliceKey, "status", action, type]);

  const isLoading = defaultMemoize((state, key) => pathOr(false, getPath("loading", key), state));
  const getError = defaultMemoize((state, key) => pathOr(null, getPath("error", key), state));

  return {
    isLoading,
    getError,
  };
};

export default createStatusSelectors;
