import React from 'react';
import Styled from './FilterModal.styles';

const Modal = props => {
  return (
    <Styled.ModalWrapper {...props}>
      <div>{props.children}</div>
      <Styled.ButtonContainer>
        <Styled.ClearButton onClick={props.clicked}>Clear</Styled.ClearButton>
        <Styled.CustomButton onClick={props.save} type="facebook">
          Save
        </Styled.CustomButton>
      </Styled.ButtonContainer>
    </Styled.ModalWrapper>
  );
};
export default Modal;
