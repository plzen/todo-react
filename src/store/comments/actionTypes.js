import { createEntityActionConstants } from "../shared/entity";
import { createStatusActionConstants } from "../shared/status";

const CommentsConstants = {
  ...createEntityActionConstants("COMMENTS"),
  ...createStatusActionConstants("COMMENTS"),
};

export default CommentsConstants;
