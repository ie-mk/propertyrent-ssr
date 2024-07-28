import styled from 'styled-components';
import { Button } from '@kiwicom/orbit-components/es';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
  marginMap,
} from '../../../constants/styles';

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;

  justify-content: center;
  background-color: ${colors.primary};
  opacity: 0.7;
  pointer-events: none;
`;

const MakeDefaultButton = styled(Button)`
  position: absolute;
  bottom: ${paddingMap.md};
  pointer-events: auto;
  background-color: ${colors.defaultButton.background};
`;

const DeleteIconWrapper = styled.div`
  top: ${paddingMap.xS};
  right: ${paddingMap.sm};
  position: absolute;
  pointer-events: auto;
  font-size: ${fontSizeMap.title1};
  i {
    color: ${colors.danger};
    cursor: pointer;
  }
`;

export default {
  Wrapper,
  Overlay,
  MakeDefaultButton,
  DeleteIconWrapper,
};
