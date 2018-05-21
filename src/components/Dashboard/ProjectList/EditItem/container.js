import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import EditProjectForm from "./component";

import { projectsActions, projectsSelectors } from "../../../../store/projects";
import { userSelectors } from "../../../../store/user";

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
    project: { key, name },
  } = props;
  const { uid } = userSelectors.getUser(state);

  return {
    loading: projectsSelectors.isEditLoading(state, key),
    initialValues: {
      uid,
      key,
      projectName: name,
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
