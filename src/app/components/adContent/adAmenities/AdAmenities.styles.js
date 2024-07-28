import styled from 'styled-components';
import {
  fontSizeMap,
  paddingMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

export const Icon = styled.div`
  padding-right: ${paddingMap.md};
`;

export const HeaderText = styled.div`
  font-size: ${fontSizeMap.title2};
  font-weight: bold;
  padding-top: ${paddingMap.xxS};
  padding-bottom: ${paddingMap.sm};
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius.xs};
  height: 40px;
  width: 32%;
  margin-top: ${marginMap.md};
  margin-bottom: ${marginMap.md};
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
`;

export default {
  Icon,
  HeaderText,
  Button,
};
