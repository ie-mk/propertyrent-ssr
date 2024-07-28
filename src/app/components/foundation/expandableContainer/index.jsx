import React, { useState, useEffect } from 'react';
import Styled from './ExpandableContainer.styles';

const ExpandableContainer = ({
  title,
  children,
  footer,
  header,
  isCollapsed = true,
  renderHidden,
}) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const FooterComponent = footer;

  useEffect(() => {
    collapsed !== isCollapsed && setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <Styled.Wrapper className="collapse-container">
      <Styled.HeaderWrapper onClick={() => setCollapsed(!collapsed)}>
        <Styled.Header>
          <Styled.StyledHeaderTitle data-test="test-title">
            {title}
          </Styled.StyledHeaderTitle>
          {header}
        </Styled.Header>
        <Styled.CollapseButton>
          <i className={`fa fa-chevron-${collapsed ? 'down' : 'up'}`} />
          {collapsed ? 'Expand' : 'Collapse'}
        </Styled.CollapseButton>
      </Styled.HeaderWrapper>
      <Styled.Content renderHidden={renderHidden} collapsed={collapsed}>
        {children}
      </Styled.Content>
      {footer && (
        <Styled.Footer collapsed={collapsed}>
          <FooterComponent />
        </Styled.Footer>
      )}
    </Styled.Wrapper>
  );
};

export default ExpandableContainer;
