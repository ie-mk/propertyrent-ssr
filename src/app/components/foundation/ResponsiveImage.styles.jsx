import styled from 'styled-components';

const ImageContainer = styled.div`
  width: ${({ width }) => width || ''};
  height: ${({ height }) => height || ''};
  padding: ${({ padding }) => padding || ''};
  margin: ${({ margin }) => margin || ''};
  border-radius: ${({ borderRadius }) => borderRadius || ''};
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: ${({ backGroundSize }) => backGroundSize || 'cover'};
  flex: ${({ flex }) => flex || ''};
  cursor: ${({ cursor }) => cursor || ''};
`;

export default {
  ImageContainer,
};
