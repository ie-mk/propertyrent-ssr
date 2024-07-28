import styled from 'styled-components';
import {
  colors,
  fontSizeMap,
  marginMap,
  paddingMap,
} from '../../../../constants/styles';
import { lightenDarkenColor } from '../../../../utils/colors';

const Wrapper = styled.div`
  select {
    background-color: ${lightenDarkenColor(colors.gray, 90)};
    color: ${colors.black};
    margin-bottom: ${marginMap.md};
  }
  textarea {
    margin-bottom: ${marginMap.md};
    padding: ${paddingMap.xS};
    font-size: ${fontSizeMap.title5};
  }
`;

const InputWrapper = styled.div`
  margin-bottom: ${marginMap.sm};
  width: ${({ width }) => width};
  min-width: 100px;
  label {
    font-weight: bold;
    span {
      font-size: 10px;
    }
  }
`;

const FieldGroup = styled.div`
  display: flex;

  div:first-child {
    margin-right: ${marginMap.md};
  }
  div {
    width: 100px;
  }
`;

export default {
  Wrapper,
  InputWrapper,
  FieldGroup,
};
