import React from 'react';
import Dashboard from '../components/pages/dashboard/Dashboard';
import ErrorBoundary from '../components/ErrorBoundary';

const DashboardPage = () => (
  <ErrorBoundary>
    <Dashboard />
  </ErrorBoundary>
);

export default DashboardPage;
