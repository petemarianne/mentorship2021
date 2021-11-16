import React, { useState } from 'react';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { emptyFilter, FilterContext } from '../../contexts/filter-context';
import { AuthContext } from '../../contexts/auth-context';
import { Filter } from '../../interfaces';
import { useAuth } from '../../hooks/useAuth';

const Layout: React.FC = ({ children }): JSX.Element => {
    const [filterState, setFilterState] = useState<Filter>(emptyFilter);
    const {sellerID, logout, login} = useAuth();

    return (
        <AuthContext.Provider value={{sellerID, logout, login}}>
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
