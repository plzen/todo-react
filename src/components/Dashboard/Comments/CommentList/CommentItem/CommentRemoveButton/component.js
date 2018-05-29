import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const CommentRemoveButtonComponent = ({ loading, handleRemove }) => (
  <Icon name="remove" size="large" onClick={handleRemove} link loading={loading} />
);

CommentRemoveButtonComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default CommentRemoveButtonComponent;
