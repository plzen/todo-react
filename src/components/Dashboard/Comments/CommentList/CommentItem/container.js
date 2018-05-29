import React from "react";
import PropTypes from "prop-types";

import CommentItem from "./component";

const CommentItemContainer = ({ comment }) => <CommentItem comment={comment} />;

CommentItemContainer.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItemContainer;
