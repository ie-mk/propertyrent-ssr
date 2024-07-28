import React from 'react';
import ReactDOM from 'react-dom';
import Styled from './Modal.styles';

const Modal = ({
  children,
  title,
  onClose,
  elementSelector = '__next',
  styles,
  fullPageWidth,
}) => {
  return ReactDOM.createPortal(
    <Styled.ModalOverlay>
      <Styled.ModalContainer
        data-test="modal"
        styles={styles}
        fullPageWidth={fullPageWidth}
      >
        <Styled.Header>
          {title}
          <Styled.CloseButton onClick={() => onClose()}>
            <i className="fa fa-close" />{' '}
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>,
    document.getElementById(elementSelector),
  );
};

export default Modal;
