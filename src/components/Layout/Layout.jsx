import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ pageWrapperClass, children }) => {
  return (
    <>
        <Header/>
        <main className={pageWrapperClass}>
            {children}
        </main>
        <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  pageWrapperClass: PropTypes.string,
};

export default Layout;
