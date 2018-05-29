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
    this.handleCreateFileComment = this.handleCreateFileComment.bind(this);
  }

  handleCreateComment(values) {
    const {
      createComment,
      task: { key, projectKey },
    } = this.props;

    createComment(projectKey, key, values);
  }

  handleCreateFileComment(e) {
    const file = e.target.files[0];
    if (file) {
      const {
        uploadComment,
        task: { key, projectKey },
      } = this.props;

      uploadComment(projectKey, key, file);
    }
  }

  render() {
    return (
      <NewCommentForm
        {...this.props}
        createComment={this.handleCreateComment}
        createFileComment={this.handleCreateFileComment}
      />
    );
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
  uploadComment: commentsActions.uploadComment,
};

NewCommentFormContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  createComment: PropTypes.func.isRequired,
  uploadComment: PropTypes.func.isRequired,
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
  }).isRequired,
};

const newCommentForm = reduxForm({
  form: "newCommentForm",
})(NewCommentFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newCommentForm);
