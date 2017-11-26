import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Arrow = styled.button`
  width: 0;
  height: 0;
  border-style: solid;
  float: left;
  position: relative;

  ${props => props.priority === 'high' && css`
    border-color: transparent transparent #43b05c transparent;
    border-width: 0 15px 26px 15px;
    right: 76px;
    bottom: 100px;
  `};
  ${props => props.priority === 'low' && css`
    border-color: #ff7700 transparent transparent transparent;
    border-width: 26px 15px 0px 15px;
    right: 46px;
    bottom: 65px;
  `};

  &:hover {
    opacity: 0.5;
  }
`;

const Priorities = props => (
  <div>
    <Arrow priority="low" onClick={() => props.setPriority(1)} />
    <Arrow priority="high" onClick={() => props.setPriority(-1)} />
  </div>
);

Priorities.propTypes = {
  setPriority: PropTypes.func.isRequired,
};

export default Priorities;
