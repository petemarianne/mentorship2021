import React, { useState } from 'react';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { emptyFilter, FilterContext } from '../../contexts/filter-context';
import { AuthContext } from '../../contexts/auth-context';
import { Filter } from '../../interfaces';

const Layout: React.FC = ({ children }): JSX.Element => {
    const [filterState, setFilterState] = useState<Filter>(emptyFilter);
    const [sellerID, setSellerID] = useState<string | undefined>(undefined);

    return (
        <AuthContext.Provider value={{sellerID, setSellerID}}>
            <FilterContext.Provider value={{filter: filterState, setFilterState}}>
                <Header />
                <main id='main'>
                    {children}
                </main>
                <Footer />
            </FilterContext.Provider>
        </AuthContext.Provider>
      );
};

export default Layout;
