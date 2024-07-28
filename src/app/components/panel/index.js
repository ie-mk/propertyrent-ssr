import React from 'react';
import { Container } from '../foundation';
import { css } from 'styled-components';

const styles = css`
  min-height: 400px;
`;

const Panel = ({ children }) => {
  return (
    <Container borderBottom="1px" styles={styles}>
      <Container marginLeft="xxl" marginTop="xxl" fontSize="title1">
        {children}
      </Container>
    </Container>
  );
};

export default Panel;
