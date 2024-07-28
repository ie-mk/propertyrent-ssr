import React from 'react';
import { logIsServer } from '../utils/utils';
import FireBaseUILoginPage from '../components/pages/login/FireBaseUILoginPage';
import { IS_SERVER } from '../constants';
import ErrorBoundary from '../components/ErrorBoundary';

const Login = () => {
  return !IS_SERVER ? (
    <ErrorBoundary>
      <FireBaseUILoginPage />
    </ErrorBoundary>
  ) : null;
};

Login.getInitialProps = async ctx => {
  logIsServer('login getInitailProps');
  return {};
};

export default Login;
