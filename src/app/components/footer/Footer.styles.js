import styled from 'styled-components';
import { fontSizeMap, colors, marginMap } from '../../constants/styles';
import { lightenDarkenColor } from '../../utils/colors';

const Wrapper = styled.div`
  display: flex;
  padding: 50px 10% 100px;
  background-color: ${lightenDarkenColor(colors.header, 60)};
  color: ${colors.white};
  width: 100%;
`;

const Column = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 15%;
`;

const Address = styled.div`
  font-size: ${fontSizeMap.title4};
`;

const Header = styled.header`
  font-size: ${fontSizeMap.title2};
  margin-bottom: ${marginMap.lg};
`;

const Social = styled.div`
  display: flex;
`;

const Line = styled.div`
  margin-bottom: ${marginMap.xS};
`;

export default {
  Wrapper,
  Column,
  Address,
  Header,
  Social,
  Line,
};
