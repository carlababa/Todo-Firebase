import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const StyledTime = styled.p`
  font-size: 15px;
  position: relative;
  float: right;
  right: 60px;
  bottom: 50px;
`;

class TimeToEnd extends Component {
  state = { time: '' }

  componentDidMount() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (new Date() > this.props.dueTime) {
      this.triggeredPassedNow = true;
    }
    this.updateTime(this.props.dueTime);
    this.interval = setInterval(() => this.updateTime(this.props.dueTime), 1000 * 10);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dueTime !== nextProps.dueTime) {
      if (new Date() < this.props.dueTime) {
        this.triggeredPassedNow = false;
      }
      this.updateTime(nextProps.dueTime);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateTime = (dueTime) => {
    const momentDueTime = moment(dueTime);
    const time = momentDueTime.fromNow();
    this.setState({ time });

    if (new Date() > dueTime && !this.triggeredPassedNow) {
      this.triggerPassedNow();
    }
  }

  triggerPassedNow = () => {
    this.triggeredPassedNow = true;
    this.props.onPassedNow();
  }

  render() {
    return (
      <StyledTime>{this.state.time}</StyledTime>
    );
  }
}

TimeToEnd.propTypes = {
  dueTime: PropTypes.object.isRequired,
  onPassedNow: PropTypes.func.isRequired,
};

export default TimeToEnd;
