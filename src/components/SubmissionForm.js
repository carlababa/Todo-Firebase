import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, SubmitButton, Label, ErrorMessage } from './styledComponents';

const StyledContainer = styled.div`
  padding: 15px;
`;

const SubmissionForm = props => (
  <StyledContainer>
    <form onSubmit={props.handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input type="text" name="email" value={props.email} onChange={props.setValue} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" value={props.password} onChange={props.setValue} />
      <SubmitButton type="submit">{props.buttonText}</SubmitButton>
    </form>
    {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
  </StyledContainer>
);

SubmissionForm.defautProps = {
  errorMessage: null,
};

SubmissionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default SubmissionForm;
