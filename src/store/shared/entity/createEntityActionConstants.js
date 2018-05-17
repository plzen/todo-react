import { map } from "ramda";

const BaseActions = {
  SET: "SET",
};

const asPrefixedPair = prefix => key => `${prefix}_${key}`;

const createEntityActionConstants = prefix => map(asPrefixedPair(prefix), BaseActions);

export default createEntityActionConstants;
