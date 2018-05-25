import React, { Component } from "react";
import PropTypes from "prop-types";

class CommentsContainer extends Component {
  render() {
    return <div>{this.props.taskKey}</div>;
  }
}

CommentsContainer.propTypes = {
  taskKey: PropTypes.string.isRequired,
};

export default CommentsContainer;
