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
  border-radius: ${borderRadius.sm};
  background-color: ${colors.borders.enabled};
  color: ${colors.modal.backgroundColor};
  width: 20%;
`;

export const InputStyles = styled.div`
  width: 100%;
  padding-left: ${paddingMap.sm};
  .search-input {
    line-height: 30px;
    border: none;
    font-size: ${fontSizeMap.title3};
    font-weight: bold;
    padding-left: ${paddingMap.sm};
    color: ${colors.gray};
  }
  .search-input:focus {
    outline: none;
  }
`;

export const Label = styled.div`
  margin-left: ${marginMap.md};
  padding-top: ${paddingMap.sm};
  font-size: ${fontSizeMap.title3};
  color: ${colors.borders.disabled};
`;

export const FormWrapper = styled.div`
  width: 300px;
  padding: ${paddingMap.lg}
  border-bottom: 1px solid ${colors.gray};
`;

export const PriceContainer = styled.div`
  border: 2px solid ${colors.borders.primary};
  width: 40%;
  border-radius: ${borderRadius.sm};
  overflow: hidden;
`;

export const PriceRange = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${paddingMap.md};
  align-items: center;
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
  FormWrapper,
  PriceRange,
  CustomButton,
  ClearButton,
  InputStyles,
  PriceContainer,
  Label,
};
