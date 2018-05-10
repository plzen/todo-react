import React from "react";
import { Container, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./style.css";

const Loading = ({ inline }) => (
  <Container className="loading-container">
    <Loader active inline={inline} />
  </Container>
);

Loading.propTypes = {
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["centered"])]),
};

Loading.defaultProps = {
  inline: "centered",
};

export default Loading;
