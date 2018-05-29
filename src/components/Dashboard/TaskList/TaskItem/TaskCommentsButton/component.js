import React from "react";
import { Icon, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import Comments from "../../../Comments";

import "./style.css";

const TaskCommentsButtonComponent = ({ task }) => (
  <Modal
    trigger={
      <div>
        {!!task.commentsCount && <span className="comments-count">{task.commentsCount}</span>}
        <Icon name="comments" size="large" link />
      </div>
    }
    closeIcon
    dimmer="inverted"
  >
    <Modal.Header>Add Comment</Modal.Header>
    <Modal.Content>
      <Comments task={task} />
    </Modal.Content>
  </Modal>
);

TaskCommentsButtonComponent.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCommentsButtonComponent;
