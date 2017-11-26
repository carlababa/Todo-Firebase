import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Label = styled.label`
  font-weight: 500;
  font-size: 12px;
`;

export const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  padding-bottom: 15px;
  color: grey;

  &:visited {
    color: grey;
  }

  &:hover {
    color: #ffc600;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
`;
