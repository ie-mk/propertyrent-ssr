import styled from 'styled-components';
import { marginMap } from '../../../constants/styles';

const BackButton = styled.div`
  display: flex;
  cursor: pointer;
  position: absolute;
  align-items: center;
  top: 10px;
  i {
    margin-right: ${marginMap.sm};
  }
`;

export default {
  BackButton,
};
