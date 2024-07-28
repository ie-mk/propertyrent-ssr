import styled from 'styled-components';
import {
  colors,
  fontSizeMap,
  paddingMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

export const PriceRange = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${paddingMap.xl};
  align-items: center;
`;

export const PriceContainer = styled.div`
  border: 1px solid ${colors.borders.disabled};
  width: 100%;
  height: 50px;
  border-radius: ${borderRadius.sm};
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;
export const TextContainer = styled.div`
  padding: ${paddingMap.xS};
  width: ${({ width }) => (width ? width : '')};
  border-right: ${({ disabled }) =>
    disabled ? `1px solid ${colors.borders.disabled}` : ''};
`;
export const Select = styled.select`
  width: 100%;
  border: none;
  background-color: transparent;
`;

export default {
  PriceContainer,
  PriceRange,
  TextContainer,
  Select,
};
