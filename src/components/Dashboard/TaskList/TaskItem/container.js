import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskItem from "./component";

// import { tasksSelectors } from "../../../../store/tasks";

class TaskItemContainer extends Component {
  constructor(props) {
    super(props);
    // this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    const { task, editTask } = this.props;
    // if (task.key === editTask) {

    // }
    return <TaskItem task={task} />;
  }
}

const mapStateToProps = state => ({
  // editTask: tasksSelectors.getEditTask(state),
});

const mapDispatchToProps = {};

TaskItemContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemContainer);
