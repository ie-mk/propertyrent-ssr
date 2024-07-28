import styled from 'styled-components';
import {
  colors,
  fontSizeMap,
  paddingMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

export const DetailsRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-top: ${paddingMap.xxxS};
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? `1px solid ${colors.borders.primary}` : ''};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingMap[paddingBottom] : ''};
`;

export const DetailsContainer = styled.div`
  padding-top: ${paddingMap.xxxS};
  text-decoration: ${({ textDecor }) => (textDecor ? 'underline' : '')};
  font-weight: ${({ fontBold }) => (fontBold ? 'bold' : '')};
`;

export const Price = styled.span`
  font-size: ${fontSizeMap.title2};
  font-weight: bold;
`;

export const Button = styled.div`
  background: ${colors.danger};
  color: ${colors.button.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius.sm};
  height: 40px;
  margin-top: ${marginMap.md};
  margin-bottom: ${marginMap.md};
  cursor: pointer;
`;

export const CenterText = styled.div`
  display: flex;
  justify-content: center;
`;

export default {
  DetailsRow,
  Price,
  DetailsContainer,
  Button,
  CenterText,
};
