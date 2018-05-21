import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskEditButton from "./component";

import { tasksActions } from "../../../../../store/tasks";

class TaskEditButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const {
      task: { key },
      toggleTask,
    } = this.props;
    toggleTask(key);
  }

  render() {
    return <TaskEditButton onClick={this.onButtonClick} />;
  }
}

const mapDispatchToProps = {
  toggleTask: tasksActions.toggleEditTask,
};

TaskEditButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  toggleTask: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TaskEditButtonContainer);
