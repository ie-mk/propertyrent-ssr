import React from 'react';
import Styled from './CircleButton.styles';

const CircleButton = ({ disabled, clickHandler, children }) => (
  <Styled.ButtonWrapper>
    <Styled.CircleButton disabled={disabled} onClick={clickHandler}>
      {children}
    </Styled.CircleButton>
  </Styled.ButtonWrapper>
);

export default CircleButton;
