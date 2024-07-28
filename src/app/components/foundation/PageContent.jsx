import React from 'react';
import Styled from './PageContent.styles';

const PageContent = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

export default PageContent;
