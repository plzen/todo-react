import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import EditProjectForm from "./component";

import * as projectEdit from "../../../../store/projects/edit";

class EditProjectFormContainer extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    const {
      project: { key },
      toggleProject,
    } = this.props;
    toggleProject(key);
  }

  render() {
    return <EditProjectForm cancel={this.cancel} {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  loading: projectEdit.isLoading(state, props),
  initialValues: {
    key: props.project.key,
    projectName: props.project.name,
  },
});

const mapDispatchToProps = {
  editProject: projectEdit.editProject,
  toggleProject: projectEdit.toggleProject,
};

EditProjectFormContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  editProject: PropTypes.func.isRequired,
  toggleProject: PropTypes.func.isRequired,
};

const editProjectForm = reduxForm({
  form: "editProjectForm",
})(EditProjectFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(editProjectForm);
