import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import NewProjectForm from "./component";

import { projectsSelectors, projectsActions } from "../../../store/projects";

const NewProjectFormContainer = props => <NewProjectForm {...props} />;

const mapStateToProps = state => ({
  loading: projectsSelectors.isCreateLoading(state),
});

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
