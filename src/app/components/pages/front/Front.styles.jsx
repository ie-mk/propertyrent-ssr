import styled from 'styled-components';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  marginMap,
  fontSizeMap,
  paddingMap,
  borderRadius,
} from '../../../constants/styles';
import { Field } from 'redux-form';

export const TransparentWrapper = styled.div`
  width: 600px;
  background-color: ${colors.search.background};
  min-height: 100%;
  height: auto;
  position: fixed;
  left: 0;
`;

export const InputStyles = styled.div`
  margin: ${marginMap.lg};
  box-sizing: border-box;

  .search-input {
    width: 100%;
    line-height: 50px;
    font-size: ${fontSizeMap.title3};
    border-radius: ${borderRadius.xs};
    padding-left: ${paddingMap.md};
    color: ${colors.modal.inputColor};
  }
  .search-button {
    width: 100%;
    line-height: 50px;
    background-color: ${colors.search.color};
    border-radius: ${borderRadius.xs};
    font-size: ${fontSizeMap.title1};
    color: ${colors.modal.backgroundColor};
  }
`;

export const H2 = styled.h2`
  color: ${colors.modal.backgroundColor};
`;

export const FormWrapper = styled.div`
  text-align: center;
`;

const ImageBackground = styled.div`
  background-image: url('/img/backgroundImage.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100%;
  width: 100%;
  height: auto;
  position: fixed;
  left: 0;
`;

const DatePickerWrapper = styled.div`
  .DateRangePicker,
  .DateRangePickerInput {
    width: 100%;
    z-index: 999;
    line-height: 50px;
    border-radius: ${borderRadius.xs};
  }
  .DateRangePickerInput {
    display: flex;
    .DateRangePickerInput_arrow {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }
  }
`;

const ValidationError = styled.div`
  position: absolute;
  padding: 2px;
  color: ${colors.danger};
  text-align: left;
`;

export default {
  InputStyles,
  H2,
  ImageBackground,
  TransparentWrapper,
  DatePickerWrapper,
  FormWrapper,
  ValidationError,
};
