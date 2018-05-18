import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import EditProjectForm from "./component";

import { projectsActions, projectsSelectors } from "../../../../store/projects";

class EditProjectFormContainer extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    const {
      project: { key },
      toggleEditProject,
    } = this.props;

    toggleEditProject(key);
  }

  render() {
    return <EditProjectForm cancel={this.cancel} {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  const {
    project: { key },
  } = props;

  return {
    loading: projectsSelectors.isEditLoading(state, key),
    initialValues: {
      key: props.project.key,
      projectName: props.project.name,
    },
  };
};

const mapDispatchToProps = {
  editProject: projectsActions.editProject,
  toggleEditProject: projectsActions.toggleEditProject,
};

EditProjectFormContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  editProject: PropTypes.func.isRequired,
  toggleEditProject: PropTypes.func.isRequired,
};

const editProjectForm = reduxForm({
  form: "editProjectForm",
})(EditProjectFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(editProjectForm);
