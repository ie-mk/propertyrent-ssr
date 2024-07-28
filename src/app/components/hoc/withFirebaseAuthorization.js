import React from 'react';
import Router from 'next/router';
import firebase from '../../../firebase/app';

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          Router.push('sign-in');
        }
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return WithAuthorization;
};

export default withAuthorization;
