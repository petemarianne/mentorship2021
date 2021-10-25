import React, { useState } from 'react';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { emptyFilter, FilterContext } from '../../contexts/filter-context';

interface LayoutProps {
    children: any,
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
    const [filterState, setFilterState] = useState(emptyFilter);

    return (
        <FilterContext.Provider value={{filter: filterState, setFilterState}}>
            <Header />
            <main id='main'>
                {children}
            </main>
            <Footer />
        </FilterContext.Provider>
      );
};

export default Layout;
