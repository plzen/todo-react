import React from "react";
import PropTypes from "prop-types";

import CommentList from "./CommentList";

const CommentsComponent = ({ task }) => <CommentList task={task} />;

CommentsComponent.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsComponent;
