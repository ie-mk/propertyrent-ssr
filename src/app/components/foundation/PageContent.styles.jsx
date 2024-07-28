import styled from 'styled-components';
import { paddingMap } from '../../constants/styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: calc(100vh - 360px);
`;

const Content = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: ${paddingMap.lg};
`;

export default {
  Wrapper,
  Content,
};
