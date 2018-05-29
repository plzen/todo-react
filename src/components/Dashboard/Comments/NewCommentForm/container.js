import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import NewCommentForm from "./component";

import { commentsActions, commentsSelectors } from "../../../../store/comments";

class NewCommentFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCreateComment = this.handleCreateComment.bind(this);
  }

  handleCreateComment(values) {
    const {
      createComment,
      task: { key, projectKey },
    } = this.props;

    createComment(projectKey, key, values);
  }

  render() {
    return <NewCommentForm {...this.props} createComment={this.handleCreateComment} />;
  }
}

const mapStateToProps = (state, props) => {
  const {
    task: { key },
  } = props;

  return {
    loading: commentsSelectors.isCreateLoading(state, key),
  };
};

const mapDispatchToProps = {
  createComment: commentsActions.createComment,
};

NewCommentFormContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  createComment: PropTypes.func.isRequired,
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
  }).isRequired,
};

const newCommentForm = reduxForm({
  form: "newCommentForm",
})(NewCommentFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newCommentForm);
