import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CommentList from "./component";

import { commentsActions, commentsSelectors } from "../../../../store/comments";

class CommentListContainer extends Component {
  componentDidMount() {
    const { task, loadComments } = this.props;
    loadComments(task.key);
  }

  render() {
    const { loading, error, comments } = this.props;
    return <CommentList loading={loading} error={error} comments={comments} />;
  }
}

const mapStateToProps = (state, props) => {
  const {
    task: { key },
  } = props;

  return {
    loading: commentsSelectors.isListLoading(state, key),
    error: commentsSelectors.getListError(state, key),
    comments: commentsSelectors.getComments(state, key),
  };
};

const mapDispatchToProps = {
  loadComments: commentsActions.loadComments,
};

CommentListContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  comments: PropTypes.array,
  loadComments: PropTypes.func.isRequired,
};

CommentListContainer.defaultProps = {
  comments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
