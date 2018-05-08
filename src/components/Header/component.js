import React from "react";
import PropTypes from "prop-types";
import { Container, Icon } from "semantic-ui-react";

import "./style.css";

const AppHeaderComponent = ({ loggedIn, loading, signout }) => (
  <div className="header-wrapper">
    <Container>
      <div className="header-container">
        <span />
        <span className="header-title">ToDo List</span>
        {loggedIn ? (
          <Icon link name="sign out" size="big" loading={loading} onClick={signout} />
        ) : (
          <span />
        )}
      </div>
    </Container>
  </div>
);

AppHeaderComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
};

export default AppHeaderComponent;
