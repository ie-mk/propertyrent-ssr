import React from 'react';
import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import Link from 'next/link';

const LinkWrapper = styled.div`
  margin-left: 10px;
`;

const MenuLink = ({ href, as, text, children, dataTest }) => (
  <LinkWrapper>
    <Link href={href} as={as}>
      <Button dataTest={dataTest} type="secondary">
        {children ? children : text}
      </Button>
    </Link>
  </LinkWrapper>
);

export default MenuLink;
