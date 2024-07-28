import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import {
  borderRadius,
  colors,
  marginMap,
  paddingMap,
} from '../../../../constants/styles';

export const CustomButton = styled(Button)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 200px;
`;

export const CustomButton1 = styled(Button)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.warning};
  width: 200px;
  margin-right: ${marginMap.lg};
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: ${paddingMap.sm};
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const EditReservedButtonsWraper = styled.div`
  display: flex;
`;

export default {
  EditReservedButtonsWraper,
  Wrapper,
  ButtonContainer,
  CustomButton,
  CustomButton1,
};
