import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import EditTaskForm from "./component";

import { tasksActions, tasksSelectors } from "../../../../store/tasks";

class EditTaskFormContainer extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    const {
      task: { key },
      toggleEditTask,
    } = this.props;

    toggleEditTask(key);
  }

  render() {
    return <EditTaskForm cancel={this.cancel} {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  const {
    task: { key, projectKey, name },
  } = props;
  return {
    loading: tasksSelectors.isEditLoading(state, key),
    initialValues: {
      key,
      projectKey,
      taskName: name,
    },
  };
};

const mapDispatchToProps = {
  editTask: tasksActions.editTask,
  toggleEditTask: tasksActions.toggleEditTask,
};

EditTaskFormContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  editTask: PropTypes.func.isRequired,
  toggleEditTask: PropTypes.func.isRequired,
};

const editTaskForm = reduxForm({
  form: "editTaskForm",
})(EditTaskFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(editTaskForm);
