import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LinkStyled = styled.a`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

const Logo = ({ imgSrc, width, title }) => (
  <Link href="/" as="/">
    <LinkStyled>
      {title && <h1>{title}</h1>}
      {imgSrc && <img src={imgSrc} alt="logo" width={width} />}
    </LinkStyled>
  </Link>
);
export default Logo;
