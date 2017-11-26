import styled from 'styled-components';

export const Button = styled.button`
  height: 25px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  box-shadow: none;
  display: block;
  width: 50%;
  margin: 5px auto;
`;


export const SubmitButton = Button.extend`
  background-color: #ffefb9;
`;
