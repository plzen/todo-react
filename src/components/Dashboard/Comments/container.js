import React from "react";
import PropTypes from "prop-types";

import Comments from "./component";

const CommentsContainer = ({ task }) => <Comments task={task} />;

CommentsContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsContainer;
