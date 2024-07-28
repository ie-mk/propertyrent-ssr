import React from 'react';
import AppBar from '../appBar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
