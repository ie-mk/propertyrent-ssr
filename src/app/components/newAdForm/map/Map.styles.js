import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 150px;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${paddingMap.sm};
`;

const Text = styled.div`
  padding-bottom: ${paddingMap.lg};
`;

const MapContent = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: ${marginMap.lg};
`;

export default {
  Text,
  MapContent,
  CustomButton,
  ButtonContainer,
};
