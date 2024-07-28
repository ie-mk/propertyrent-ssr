import styled from 'styled-components';
import { marginMap, paddingMap } from '../../../constants/styles';

const Text = styled.div`
  padding-bottom: ${paddingMap.lg};
`;

const MapContent = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: ${marginMap.lg};
`;

export default {
  Text,
  MapContent,
};
