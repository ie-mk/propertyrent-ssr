import styled from 'styled-components';
import { fontSizeMap, paddingMap } from '../../../constants/styles';

export const Icon = styled.div`
  padding-left: ${paddingMap.md};
  padding-right: ${paddingMap.md};
`;

export const HeadText = styled.div`
  font-size: ${fontSizeMap.title3};
  font-weight: bold;
  padding-top: ${paddingMap.xxS};
`;

export default {
  Icon,
  HeadText,
};
