import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import { colors, paddingMap, borderRadius } from '../../../constants/styles';

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 200px;
`;

export const CustomButton1 = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.defaultButton.background};
  width: 200px;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: ${paddingMap.sm};
`;

export default {
  ButtonContainer,

  CustomButton,
  CustomButton1,
};
