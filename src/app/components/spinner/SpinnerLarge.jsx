import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0.3;
  i {
    font-size: 82px;
  }
`;

const SpinnerLarge = () => {
  return (
    <Wrapper data-test="loading-spinner">
      <i className="fa fa-circle-o-notch fa-spin spinner" />
    </Wrapper>
  );
};

export default SpinnerLarge;
