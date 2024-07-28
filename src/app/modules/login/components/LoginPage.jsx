// Import FirebaseAuth and firebase.
import React from 'react';
import styled from 'styled-components';
import { loginWithProvider } from '../api/api';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  position: fixed;
  top: 20%;
  left: 30%;
  background-color: grey;
  border-radius: 2px;

  i {
    font-size: 25px;
    margin-right: 10px;
  }

  button {
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 2px;
    text-align: center;
    display: flex;
    align-items: center;
  }
`;

const FaceBookButton = styled.button`
  background-color: cornflowerblue;
`;

const GoogleButton = styled.button`
  background-color: palevioletred;
`;

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendersOnClient: false,
    };
  }
  componentDidMount() {
    this.setState({
      rendersOnClient: true,
    });
  }

  render() {
    const { rendersOnClient } = this.state;
    return (
      <div>
        {rendersOnClient && (
          <>
            <Wrapper>
              <p>Please sign-in:</p>
              <GoogleButton
                className="btn-google"
                onClick={() => loginWithProvider('google')}
              >
                <i className="fa fa-google" /> Sign in with Google
              </GoogleButton>
              <FaceBookButton
                className="btn-facebook"
                onClick={() => loginWithProvider('facebook')}
              >
                <i className="fa fa-facebook" /> Sign in with Facebook
              </FaceBookButton>
            </Wrapper>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(SignInScreen);
