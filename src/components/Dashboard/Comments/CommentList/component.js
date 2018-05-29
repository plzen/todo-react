import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Loading } from "../../../common";
import CommentItem from "./CommentItem";

const CommentListComponent = ({ loading, error, comments }) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Container>
      {[...comments].map(comment => <CommentItem key={comment.key} comment={comment} />)}
    </Container>
  );
};

CommentListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  comments: PropTypes.array.isRequired,
};

export default CommentListComponent;
