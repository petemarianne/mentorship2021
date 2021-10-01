import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import { FilterContext } from '../../contexts/filter-context';
import useFilter from "../../hooks/useFilter";

const Layout = ({ pageWrapperClass, children }) => {
    const {filterState, setFilterState} = useFilter();

    return (
        <FilterContext.Provider value={{filter: filterState, setFilterState}}>
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
