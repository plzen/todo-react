import { map } from "ramda";

const BaseActions = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const asPrefixedPair = prefix => key => `${prefix}_STATUS_${key}`;

const createStatusActionConstants = prefix => map(asPrefixedPair(prefix), BaseActions);

export default createStatusActionConstants;
