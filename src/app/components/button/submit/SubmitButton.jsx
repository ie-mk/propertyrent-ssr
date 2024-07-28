import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import { borderRadius, colors } from '../../../constants/styles';

export const SubmitButton = styled(Button)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
`;

export default SubmitButton;
