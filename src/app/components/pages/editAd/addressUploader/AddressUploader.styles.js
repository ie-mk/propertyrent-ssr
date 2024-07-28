import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
  marginMap,
} from '../../../../constants/styles';
const ValidationError = styled.div`
  position: absolute;
  padding: 2px;
  color: ${colors.danger};
  text-align: left;
`;
export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 150px;
`;

export const Title = styled.div`
  font-size: ${fontSizeMap.title3};
`;
export const InputStyles = styled.div`
  width: 100%;
  padding-right: ${paddingMap.sm};
  .update-input {
    line-height: 40px;
    font-size: ${fontSizeMap.title3};
    width: 100%;
    padding-left: ${paddingMap.sm};
    color: black;
    border: 1px solid ${colors.primary};
    border-radius: ${borderRadius.xs};
  }
  .countryUpdate-input1 {
    height: 40px;
    font-size: ${fontSizeMap.title3};
    width: 100%;
    padding-left: ${paddingMap.sm};
    color: black;
    border: 1px solid ${colors.primary};
    border-radius: ${borderRadius.xs};
  }
  .search-input:focus {
    outline: none;
  }
`;

export const PhoneInputStyles = styled.div`
  padding-left: ${paddingMap.sm};
  border: 1px solid ${colors.primary};
  border-radius: ${borderRadius.xs};
  .PhoneInput {
    height: 40px;
  }
  .PhoneInputInput {
    height: 35px;
    border: none;
    font-size: ${fontSizeMap.title3};
  }
  .PhoneInputInput:focus {
    outline: none;
  }
`;
export const Label = styled.div`
  padding-top: ${paddingMap.sm};
  padding-bottom: ${paddingMap.xxxS};
  color: ${colors.borders.disabled};
`;

export const NameContainer = styled.div`
  width: 50%;
`;

export const AddressContainer = styled.div`
  width: 33%;
`;

export const Container = styled.div`
  width: 100%;
`;

export const InputRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${paddingMap.sm};
  align-items: center;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${paddingMap.sm};
`;

export default {
  InputRow,
  ButtonContainer,
  InputStyles,
  NameContainer,
  Label,
  Container,
  AddressContainer,
  Title,
  ValidationError,
  PhoneInputStyles,
  CustomButton,
};
