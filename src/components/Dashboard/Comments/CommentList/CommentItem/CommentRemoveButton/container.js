import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CommentRemoveButton from "./component";

import { commentsActions, commentsSelectors } from "../../../../../../store/comments";

class CommentRemoveButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    const {
      comment: { key, taskKey, projectKey },
      removeComment,
    } = this.props;

    removeComment(projectKey, taskKey, key);
  }

  render() {
    const { loading } = this.props;

    return <CommentRemoveButton loading={loading} handleRemove={this.remove} />;
  }
}

const mapStateToProps = (state, props) => {
  const {
    comment: { key },
  } = props;

  return {
    loading: commentsSelectors.isRemoveLoading(state, key),
  };
};

const mapDispatchToProps = {
  removeComment: commentsActions.removeComment,
};

CommentRemoveButtonContainer.propTypes = {
  comment: PropTypes.shape({
    key: PropTypes.string.isRequired,
    taskKey: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentRemoveButtonContainer);
