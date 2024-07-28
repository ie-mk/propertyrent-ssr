import styled from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  marginMap,
  borderRadius,
} from '../../constants/styles';
import { lightenDarkenColor } from '../../utils/colors';

export const InputStyles = styled.div`
  margin: ${marginMap.sm};
  width: 400px;
  box-sizing: border-box;
`;

export const CustomButton = styled.button`
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.borders.enabled};
  margin-left: ${marginMap.sm};
  font-weight: bold;
  color: #007a87;
  background-color: ${colors.white};
  padding: ${paddingMap.sm};
  &:focus,
  &:active,
  &:hover {
    background-color: ${lightenDarkenColor(colors.gray, 70)}!important;
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const FilterWrapper = styled.div`
  position: relative;
  button {
  }
`;

export default {
  ButtonGroup,
  InputStyles,
  CustomButton,
  FilterWrapper,
};
