import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import { colors, marginMap, borderRadius } from '../../../../constants/styles';

export const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: ${marginMap.lg};
`;

export const CustomButton = styled(Button)`
  border-radius: ${borderRadius.md};
  width: 150px;
  margin-right: 20px;
`;

export default {
  ButtonWrapper,
  CustomButton,
};
