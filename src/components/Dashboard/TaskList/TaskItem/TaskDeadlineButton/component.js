import React from "react";
import { Button, Grid, Icon, Modal } from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import PropTypes from "prop-types";

import "./style.css";

const TaskDeadlineButtonComponent = ({
  opened,
  disabled,
  loading,
  date,
  time,
  onDateChange,
  onTimeChange,
  handleOpen,
  handleClose,
  onButtonClick,
}) => (
  <Modal
    trigger={<Icon name="time" size="large" onClick={handleOpen} link />}
    closeIcon
    size="tiny"
    open={opened}
    onClose={handleClose}
  >
    <Modal.Header>Deadline</Modal.Header>
    <Modal.Content>
      <Grid columns="equal">
        <Grid.Row stretched>
          <Grid.Column>
            <span>Date</span>
            <DateInput onChange={onDateChange} value={date} />
            <Button
              className="task-deadline-dialog-button"
              primary
              loading={loading}
              disabled={loading || disabled}
              onClick={onButtonClick}
            >
              Save
            </Button>
          </Grid.Column>
          <Grid.Column>
            <span>Time</span>
            <TimeInput onChange={onTimeChange} value={time} />
            <Button className="task-deadline-dialog-button" onClick={handleClose}>
              Cancel
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  </Modal>
);

TaskDeadlineButtonComponent.propTypes = {
  opened: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default TaskDeadlineButtonComponent;
