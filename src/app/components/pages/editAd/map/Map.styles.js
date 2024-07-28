import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
  marginMap,
} from '../../../../constants/styles';

export const CustomButton = styled(Button)`
  border-radius: ${borderRadius.md};
  background-color: ${({ adjust }) =>
    adjust ? colors.warning : colors.updateProfile.color};
  width: 150px;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${paddingMap.sm};
  margin-top: ${marginMap.md};
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

const Message = styled.div`
  position: absolute;
  color: ${colors.warning};
  top: -10px;
`;

const Wrapper = styled.div`
  position: relative;
`;

export default {
  Wrapper,
  Message,
  Text,
  MapContent,
  CustomButton,
  ButtonContainer,
};
