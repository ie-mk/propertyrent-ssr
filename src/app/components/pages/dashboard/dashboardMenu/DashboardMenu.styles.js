import styled from 'styled-components';
import { paddingMap } from '../../../../constants/styles';

export const MenuItem = styled.div`
  padding: ${paddingMap.sm};
  padding-bottom: ${paddingMap.md};
  box-shadow: ${({ active }) => (active ? '1px 2px 2px 1px gray' : '')};
  i {
    padding-right: ${paddingMap.md};
  }
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default {
  MenuItem,
  Label,
};
