import React, { useEffect } from 'react';
import Results from '../components/pages/results/Results';
import { IS_SERVER } from '../constants';
import { adActions } from '../store/actions';
import ErrorBoundary from '../components/ErrorBoundary';

const { fetchAds } = adActions;

const ResultsPage = () => {
  useEffect(() => {
    !IS_SERVER && fetchAds.request();
  });
  return (
    <ErrorBoundary>
      <Results />
    </ErrorBoundary>
  );
};

export default ResultsPage;
