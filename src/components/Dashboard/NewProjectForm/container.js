import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";

import NewProjectForm from "./component";

import * as projectCreate from "../../../store/projects/create";

const NewProjectFormContainer = props => <NewProjectForm {...props} />;

const mapStateToProps = state => ({
  loading: projectCreate.isLoading(state),
});

const mapDispatchToProps = {
  createProject: projectCreate.createProject,
};

NewProjectFormContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
};

const newProjectForm = reduxForm({
  form: "newProjectForm",
})(NewProjectFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newProjectForm);
