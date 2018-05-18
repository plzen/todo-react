import { createEntityActionConstants } from "../shared/entity";
import { createStatusActionConstants } from "../shared/status";

const TasksConstants = {
  ...createEntityActionConstants("TASKS"),
  ...createStatusActionConstants("TASKS"),
};

export default TasksConstants;
