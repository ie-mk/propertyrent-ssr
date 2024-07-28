import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  marginMap,
  borderRadius,
  fontSizeMap,
} from '../../constants/styles';

export const ListItemWrapper = styled.div`
  position: relative;
  display: flex;
  padding: ${paddingMap.md};
  border-bottom: 1px solid ${colors.borders.primary};
  cursor: pointer;
  background-color: ${({ highlighted }) => (highlighted ? 'grey' : '')};
  box-shadow: ${({ highlighted, hover }) =>
    highlighted || hover ? '0 0 15px rgba(0, 0, 0, 0.8)' : ''};
  height: 200px;
`;
export const DescriptionRow = styled.div`
  padding: ${paddingMap.xxxS};
`;
export const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
`;
export const PricingTotal = styled.div`
  padding-left: ${paddingMap.md};
`;
export const Image = styled.div`
  width: 300px;
  height: 200px;
  border-radius: ${borderRadius.sm};
`;

export const RatingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  i {
    color: ${colors.danger};
    position: relative;
    top: 2px;
    left: -3px;
  }
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${marginMap.sm};
`;

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 50px;
  height:30px
  color: ${colors.modal.backgroundColor};
`;

export const FavouritesIcon = styled.div`
  display: inline-block;
  margin: ${marginMap.sm};
  position: absolute;
  font-size: ${fontSizeMap.title3};
  bottom: 0;
  right: 0;
  i {
    color: ${({ favourite }) => (favourite ? colors.danger : '')};
  }
`;

export const Content = styled.div`
  width: 50%;
`;

export default {
  ListItemWrapper,
  PricingContainer,
  PricingTotal,
  Image,
  Content,
  RatingContainer,
  DescriptionRow,
  Description,
  CustomButton,
  FavouritesIcon,
};
