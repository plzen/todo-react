import React from "react";
import PropTypes from "prop-types";

import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";

const CommentsComponent = ({ task }) => (
  <div>
    <NewCommentForm task={task} />
    <CommentList task={task} />
  </div>
);

CommentsComponent.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsComponent;
