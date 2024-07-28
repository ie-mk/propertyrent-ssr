import styled from 'styled-components';
import {
  fontSizeMap,
  paddingMap,
  borderRadius,
  marginMap,
  colors,
} from '../../../constants/styles';

export const Text = styled.div`
  color: ${({ fontcolor }) => (fontcolor ? fontcolor : '')};
  padding-top: ${paddingMap.xxS};
  padding-bottom: ${paddingMap.xxS};
  i {
    color: ${colors.danger};
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const TextRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemContainer = styled.div`
  display: flex;
  margin: ${marginMap.sm};
  cursor: pointer;
`;

export default {
  Text,
  Image,
  TextRowContainer,
  ItemContainer,
};
