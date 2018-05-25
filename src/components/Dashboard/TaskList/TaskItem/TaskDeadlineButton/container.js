import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty, match } from "ramda";
import moment from "moment";

import TaskDeadlineButton from "./component";

import { tasksActions, tasksSelectors } from "../../../../../store/tasks";

class TaskDeadlineButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { opened: false, date: "", time: "" };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading && nextProps.loading === false) {
      this.setState({ opened: false });
    }
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { task, deadlineTask } = this.props;
    const { date, time } = this.state;
    const datetime = moment(`${date} ${time}`, "DD-MM-YYYY HH:mm").toDate();
    deadlineTask(task.projectKey, task.key, datetime);
  }

  handleOpen() {
    this.setState({ opened: true });
  }

  handleClose() {
    this.setState({ opened: false });
  }

  handleDateChange(e, data) {
    this.setState({ date: data.value });
  }

  handleTimeChange(e, data) {
    this.setState({ time: data.value });
  }

  render() {
    const { loading } = this.props;
    const { opened, date, time } = this.state;
    const disabled = isEmpty(date) || isEmpty(match(/^\d{1,2}:\d{1,2}$/, time));
    return (
      <TaskDeadlineButton
        opened={opened}
        disabled={disabled}
        loading={loading}
        date={date}
        time={time}
        onDateChange={this.handleDateChange}
        onTimeChange={this.handleTimeChange}
        onButtonClick={this.onButtonClick}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { task } = props;
  return {
    loading: tasksSelectors.isDeadlineLoading(state, task.key),
  };
};

const mapDispatchToProps = {
  deadlineTask: tasksActions.deadlineTask,
};

TaskDeadlineButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  deadlineTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeadlineButtonContainer);
