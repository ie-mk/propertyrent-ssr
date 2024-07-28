import styled from 'styled-components';
import { colors } from '../../constants/styles';

export const Spinner = styled.div`
  border: 5px solid ${colors.spinner};
  border-radius: 50%;
  border-top: 5px solid ${colors.success};
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default {
  Spinner,
};
