import React from "react";
import { Icon, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import Comments from "../../../Comments";

const TaskCommentsButtonComponent = ({ taskKey }) => (
  <Modal trigger={<Icon name="comments" size="large" link />} closeIcon>
    <Comments taskKey={taskKey} />
  </Modal>
);

TaskCommentsButtonComponent.propTypes = {
  taskKey: PropTypes.string.isRequired,
};

export default TaskCommentsButtonComponent;
