import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
} from '../../../constants/styles';

export const ModalWrapper = styled.div`
  position: absolute;
  left: ${({ left }) => (left ? left : 10)}px;
  top: 50px;
  padding: ${paddingMap.md};
  z-index: 500;
  background-color: ${colors.modal.backgroundColor};
  border: 1px solid ${colors.modal.border};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  border-radius: ${borderRadius.md};
  transition: all 0.3s ease-out;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: ${paddingMap.sm};
`;

export const ClearButton = styled.button`
  padding: 0 ${paddingMap.sm};
  text-align: center;
  background-color: ${colors.button.background};
  border-bottom: ${({ disabled }) =>
    disabled
      ? `1px solid ${colors.borders.disabled}`
      : `1px solid  ${colors.borders.enabled}`};
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.sm};
  background-color: ${colors.borders.enabled};
  color: ${colors.modal.backgroundColor};
  width: 20%;
`;

export default {
  ModalWrapper,
  ButtonContainer,
  ClearButton,
  CustomButton,
};
