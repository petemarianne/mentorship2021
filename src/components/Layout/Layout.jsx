import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Context } from '../../context';
import {setCountryContext} from "../../pages/Main/Main";

const Layout = ({ pageWrapperClass, children }) => {
  return (
    <Context.Provider value={{setCountryContext}}>
        <Header/>
        <main className={pageWrapperClass}>
            {children}
        </main>
        <Footer />
    </Context.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  pageWrapperClass: PropTypes.string,
};

export default Layout;
