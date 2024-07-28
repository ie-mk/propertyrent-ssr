import styled, { css } from 'styled-components';
import { colors, fontSizeMap, marginMap } from '../../../constants/styles';
import { lightenDarkenColor } from '../../../utils/colors';

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid dimgray;
  position: relative;
  padding: 10px;
  font-weight: bold;
  background-color: ${colors.lightBlue};
`;

const Header = styled.div`
  display: flex;
  margin-left: 20px;
`;

const StyledHeaderTitle = styled.header`
  margin-right: 30px;
`;

const Wrapper = styled.div`
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
  background-color: ${colors.white};
  margin-bottom: 10px;
  &:first-child {
    margin-top: 10px;
  }
`;

const CollapseButton = styled.span`
  cursor: pointer;
  i {
    display: inline-block;
    margin-right: ${marginMap.xS};
    font-size: ${fontSizeMap.title3};
  }
`;

const renderOutsideContainerCSS = css`
  position: absolute;
  left: -10000px;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 10px;
  display: ${({ collapsed, renderHidden }) =>
    collapsed && !renderHidden ? 'none' : 'block'};
  ${({ renderHidden, collapsed }) =>
    renderHidden && collapsed ? renderOutsideContainerCSS : ''};
  box-shadow: inset 0 0 3px ${lightenDarkenColor(colors.gray, 80)};
`;

const Footer = styled.div`
  padding: 10px;
  border-top: 1px solid ${lightenDarkenColor(colors.gray, -20)};
  background-color: ${lightenDarkenColor(colors.gray, 20)};
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`;

export default {
  Wrapper,
  Card,
  Header,
  HeaderWrapper,
  StyledHeaderTitle,
  Content,
  CollapseButton,
  Footer,
};
