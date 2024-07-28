import styled from 'styled-components';
import {
  colors,
  paddingMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius.xs};
  height: 40px;
  padding-top: ${paddingMap.md};
  padding-bottom: ${paddingMap.md};
  margin-left: ${marginMap.xl};
  margin-top: ${marginMap.xl};
  border: 1px solid ${colors.borders.disabled};
`;

export const Text = styled.div`
  padding-bottom: ${paddingMap.md};
`;

export default {
  Button,
  Text,
};
