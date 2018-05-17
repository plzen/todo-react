import { map } from "ramda";

const BaseActions = {
  SET: "SET",
  UPSERT: "UPSERT",
};

const asPrefixedPair = prefix => key => `${prefix}_ENTITY_${key}`;

const createEntityActionConstants = prefix => map(asPrefixedPair(prefix), BaseActions);

export default createEntityActionConstants;
