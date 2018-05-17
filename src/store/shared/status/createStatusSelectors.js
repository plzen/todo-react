import { defaultMemoize } from "reselect";
import { pathOr } from "ramda";

const createStatusSelectors = (sliceKey, action) => {
  const getPath = (type, props) => {
    const key = pathOr(null, ["entity", "key"], props);
    return key ? [sliceKey, "status", action, key, type] : [sliceKey, "status", action, type];
  };

  const isLoading = defaultMemoize((state, props) =>
    pathOr(false, getPath("loading", props), state));

  const getError = defaultMemoize((state, props) => pathOr(null, getPath("error", props), state));

  return {
    isLoading,
    getError,
  };
};

export default createStatusSelectors;
