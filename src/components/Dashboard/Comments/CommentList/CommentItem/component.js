import React from "react";
import { Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import moment from "moment";

import CommentRemoveButton from "./CommentRemoveButton";

import "./style.css";

const CommentItemComponent = ({ comment }) => (
  <div>
    <div className="comment-date">
      {moment(comment.createdAt).format("DD-MM-YYYY HH:mm")}{" "}
      <CommentRemoveButton comment={comment} />
    </div>
    <div className="comment-message">
      {comment.image ? <Image size="medium" src={comment.image} /> : comment.message}
    </div>
  </div>
);

CommentItemComponent.propTypes = {
  comment: PropTypes.shape({
    key: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    message: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default CommentItemComponent;
