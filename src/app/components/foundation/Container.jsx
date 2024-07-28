import React from 'react';
import { ContainerBase } from 'foundation';

const Container = ({ children, ...props }) => {
  return (
    <ContainerBase padding="md" marginBottom="sm" {...props}>
      {children}
    </ContainerBase>
  );
};

export default Container;
