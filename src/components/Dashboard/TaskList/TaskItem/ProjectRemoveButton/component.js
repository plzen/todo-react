import React from "react";
import { Icon, Message, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./style.css";

const Content = ({ name, error }) => (
  <div className="dialog-container">
    {error && (
      <Message negative>
        <p>{error.message}</p>
      </Message>
    )}
    <p>Do you really want to delete &quot;{name}&quot;?</p>
  </div>
);

Content.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
};

const ProjectRemoveButtonComponent = ({
  open,
  name,
  loading,
  error,
  handleOpen,
  handleClose,
  handleActions,
}) => (
  <Modal
    open={open}
    trigger={<Icon name="remove" size="large" onClick={handleOpen} />}
    onClose={handleClose}
    header="Delete project"
    content={<Content name={name} error={error} />}
    actions={[
      {
        key: "delete",
        id: "delete",
        content: "Delete",
        negative: true,
        onClick: handleActions,
        loading,
        disabled: loading,
      },
      {
        key: "cancel",
        id: "cancel",
        content: "Cancel",
        onClick: handleActions,
      },
    ]}
  />
);

ProjectRemoveButtonComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleActions: PropTypes.func.isRequired,
};

export default ProjectRemoveButtonComponent;
