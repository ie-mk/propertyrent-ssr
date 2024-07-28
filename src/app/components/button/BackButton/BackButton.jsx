import Router from 'next/router';
import Styled from './BackButton.styles';

const BackButton = () => {
  return (
    <Styled.BackButton onClick={() => Router.back()}>
      <i className="fa fa-long-arrow-left fa-2x" />
      Back to results
    </Styled.BackButton>
  );
};
export default BackButton;
