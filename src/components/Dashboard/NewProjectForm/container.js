import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import NewProjectForm from "./component";

import { projectsSelectors, projectsActions } from "../../../store/projects";
import { userSelectors } from "../../../store/user";

const NewProjectFormContainer = props => <NewProjectForm {...props} />;

const mapStateToProps = (state) => {
  const user = userSelectors.getUser(state);
  return {
    loading: projectsSelectors.isCreateLoading(state),
    initialValues: {
      uid: user.uid,
    },
  };
};

const mapDispatchToProps = {
  createProject: projectsActions.createProject,
};

NewProjectFormContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
};

const newProjectForm = reduxForm({
  form: "newProjectForm",
})(NewProjectFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newProjectForm);
