import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import useFilter from "../../hooks/useFilter";
import { FilterContext } from '../../contexts/filter-context';

const Layout = ({ pageWrapperClass, children }) => {
    const {filter, handleFilter} = useFilter();

    return (
        <FilterContext.Provider value={{filter, handleFilter}}>
            <Header />
            <main id='main' className={pageWrapperClass}>
                {children}
            </main>
            <Footer />
        </FilterContext.Provider>
      );
};

Layout.propTypes = {
  children: PropTypes.any,
  pageWrapperClass: PropTypes.string,
};

export default Layout;
