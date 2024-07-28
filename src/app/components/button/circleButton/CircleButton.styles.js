import styled from 'styled-components';
import { colors, paddingMap } from '../../../constants/styles';

export const CircleButton = styled.button`
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 50%;
  background-color: ${colors.button.background};
  border: ${({ disabled }) =>
    disabled
      ? `1px solid ${colors.borders.disabled}`
      : `1px solid  ${colors.borders.enabled}`};
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const ButtonWrapper = styled.span`
  padding: 0 ${paddingMap.lg};
`;

export default {
  ButtonWrapper,
  CircleButton,
};
