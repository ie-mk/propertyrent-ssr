import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
} from '../../../constants/styles';

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.sm};
  background-color: ${colors.borders.enabled};
  color: ${colors.modal.backgroundColor};
  width: 20%;
`;

export const GuestDetails = styled.div`
  width: 300px;
  padding: ${paddingMap.md};
  border-bottom: 1px solid;
`;

export const NumberOfGuests = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${paddingMap.md};
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: ${paddingMap.sm};
  padding-top: ${paddingMap.md};
`;
export const TypeOfGuest = styled.div`
  font-size: ${fontSizeMap.title3};
  font-weight: bold;
  color: ${colors.gray};
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

export default {
  GuestDetails,
  NumberOfGuests,
  CustomButton,
  ButtonContainer,
  TypeOfGuest,
  ClearButton,
};
