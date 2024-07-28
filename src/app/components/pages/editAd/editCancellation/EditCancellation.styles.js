import styled from 'styled-components';
import {
  fontSizeMap,
  paddingMap,
  marginMap,
  colors,
} from '../../../../constants/styles';

export const HeaderText = styled.div`
  font-size: ${fontSizeMap.title2};
  font-weight: bold;
  padding-top: ${paddingMap.xxS};
  padding-bottom: ${paddingMap.sm};
`;

export const Label = styled.label`
  padding-right: ${marginMap.md};
  font-weight: bold;
`;
export const CancelationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${marginMap.md};
  textarea {
    margin-top: ${marginMap.xS};
    width: 80%;
    min-height: 40px;
    padding: 6px;
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
  HeaderText,
  SubHeaderText,
  Label,
  CancelationWrapper,
};
