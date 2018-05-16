import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskItem from "./component";

// import * as projectList from "../../../../store/projects/list";
// import * as taskList from "../../../../store/tasks/list";

class TaskItemContainer extends Component {
  constructor(props) {
    super(props);
    // this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    const { task } = this.props;
    return <TaskItem task={task} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

TaskItemContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemContainer);
