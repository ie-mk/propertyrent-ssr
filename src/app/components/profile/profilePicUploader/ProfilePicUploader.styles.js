import styled from 'styled-components';
import customButoon from '@kiwicom/orbit-components/lib/Button';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
} from '../../../constants/styles';

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${paddingMap.sm};
  .image-input {
    display: none;
  }
`;

export const CustomButton = styled(customButoon)`
  border-radius: ${borderRadius.md};
  background-color: ${colors.updateProfile.color};
  width: 200px;
  color: ${colors.modal.backgroundColor};
`;
export const Name = styled.div`
  color: ${colors.updateProfile.color};
  font-weight: bold;
  font-size: ${fontSizeMap.title2};
`;

// export const ResponsiveImage = styled.img`
//   border-radius: 50%;
//   width: 100px;
//   height: 100px;
// `;
export const SuccessResponse = styled.label`
  i {
    color: ${colors.success};
    padding-right: ${paddingMap.sm};
  }
`;

export const FailureResponse = styled.label`
  i {
    color: ${colors.danger};
    padding-right: ${paddingMap.sm};
  }
`;

export const ImageWrapper = styled.div`
  width: 100px;
  margin: 0 auto;
`;

export default {
  ContentWrapper,
  CustomButton,
  //ResponsiveImage,
  Name,
  FailureResponse,
  SuccessResponse,
  ImageWrapper,
};
