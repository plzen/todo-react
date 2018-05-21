import { createEntityActionConstants } from "../shared/entity";
import { createStatusActionConstants } from "../shared/status";

const TasksConstants = {
  ...createEntityActionConstants("TASKS"),
  ...createStatusActionConstants("TASKS"),
  TASKS_EDIT_TOGGLE: "TASKS_EDIT_TOGGLE",
};

export default TasksConstants;
