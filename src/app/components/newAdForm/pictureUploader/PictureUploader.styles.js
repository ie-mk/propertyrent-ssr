import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
} from '../../../constants/styles';

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${paddingMap.sm};
`;

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 150px;
  color: ${colors.modal.backgroundColor};
`;

export default {
  ContentWrapper,
  CustomButton,
};
