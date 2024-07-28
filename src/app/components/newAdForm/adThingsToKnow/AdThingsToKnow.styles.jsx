import styled from 'styled-components';
import {
  fontSizeMap,
  paddingMap,
  marginMap,
  colors,
} from '../../../constants/styles';

export const Icon = styled.div`
  padding-right: ${paddingMap.md};
`;

export const HeaderText = styled.div`
  font-size: ${fontSizeMap.title2};
  font-weight: bold;
  padding-top: ${paddingMap.xxS};
  padding-bottom: ${paddingMap.sm};
`;

export const Label = styled.label`
  padding-right: ${marginMap.md};
`;
export const CancelationWrapper = styled.div`
  margin-bottom: ${marginMap.md};
  label,
  textarea {
    display: inline-block;
    vertical-align: top;
  }
  .cancellation-input {
    width: 50%;
    height: 70px;
  }
`;

export const SubHeaderText = styled.div`
  font-size: ${fontSizeMap.title4};
  font-weight: bold;
  padding-top: ${paddingMap.xxS};
  padding-bottom: ${paddingMap.sm};
  text-decoration: ${({ textDecor }) => (textDecor ? 'underline' : '')};
`;

export default {
  Icon,
  HeaderText,

  SubHeaderText,
  Label,
  CancelationWrapper,
};
