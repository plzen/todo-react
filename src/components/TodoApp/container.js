import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TodoApp from "./component";

import { userActions, userSelectors } from "../../store/user";

class TodoAppContainer extends Component {
  componentDidMount() {
    this.props.monitorSession();
  }

  render() {
    return <TodoApp restoring={this.props.restoring} />;
  }
}

const mapStateToProps = state => ({
  restoring: userSelectors.isRestoring(state),
});

const mapDispatchToProps = {
  monitorSession: userActions.monitorSession,
};

TodoAppContainer.propTypes = {
  restoring: PropTypes.bool.isRequired,
  monitorSession: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);
