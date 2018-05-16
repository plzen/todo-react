import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import NewTaskForm from "./component";

import * as taskCreate from "../../../store/tasks/create";

class NewTaskFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCreateTask = this.handleCreateTask.bind(this);
  }

  handleCreateTask(values) {
    const {
      createTask,
      project: { key },
    } = this.props;

    createTask(key, values);
  }

  render() {
    return <NewTaskForm {...this.props} createTask={this.handleCreateTask} />;
  }
}

const mapStateToProps = (state, props) => ({
  loading: taskCreate.isLoading(state, props),
});

const mapDispatchToProps = {
  createTask: taskCreate.createTask,
};

NewTaskFormContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  createTask: PropTypes.func.isRequired,
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

const newTaskForm = reduxForm({
  form: "newTaskForm",
})(NewTaskFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newTaskForm);
