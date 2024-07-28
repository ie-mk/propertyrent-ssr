import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'foundation';
import NewAdForm from '../components/newAdForm/NewAdForm';
import ErrorBoundary from '../components/ErrorBoundary';

const NewAd = ({ user }) => {
  return (
    <Container>
      <ErrorBoundary>
        <NewAdForm user={user} />
      </ErrorBoundary>
    </Container>
  );
};

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(NewAd);
