import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import "./style.css";

const CommentItemComponent = ({ comment: { createdAt, message } }) => (
  <div>
    <div className="comment-date">{moment(createdAt).format("DD-MM-YYYY HH:mm")}</div>
    <div className="comment-message">{message}</div>
  </div>
);

CommentItemComponent.propTypes = {
  comment: PropTypes.shape({
    key: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default CommentItemComponent;
