import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import { colors, paddingMap, borderRadius } from '../../constants/styles';

export const ContentWrapper = styled.div`
  padding-top: ${paddingMap.xxl};
`;
export const ComponenetWrapper = styled.div`
  padding-top: ${paddingMap.md};
  padding-bottom: ${paddingMap.md};

  :hover {
    background-color: ${colors.updateProfile.color};
    border-radius: ${borderRadius.md};
    cursor: pointer;
  }
  i {
    padding-right: ${paddingMap.md};
  }
`;

export const Label = styled.label`
  font-weight: bold;
`;
export default {
  ContentWrapper,
  ComponenetWrapper,
  Label,
};
