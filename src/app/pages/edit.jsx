import React from 'react';
import EditAdPage from '../components/pages/editAd/EditAdPage';
import ErrorBoundary from '../components/ErrorBoundary';

const Edit = () => (
  <ErrorBoundary>
    <EditAdPage />
  </ErrorBoundary>
);

export default Edit;
