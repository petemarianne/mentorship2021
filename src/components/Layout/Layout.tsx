import React, { useState } from 'react';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { emptyFilter, FilterContext } from '../../contexts/filter-context';
import { RerenderContext } from '../../contexts';
import { Filter } from '../../interfaces';

const Layout: React.FC = ({ children }): JSX.Element => {
    const [filterState, setFilterState] = useState<Filter>(emptyFilter);
    const [rerender, setRerender] = useState<boolean>(false);

    return (
        <FilterContext.Provider value={{filter: filterState, setFilterState}}>
            <RerenderContext.Provider value={{rerender, setRerender}}>
                <Header />
                <main id='main'>
                    {children}
                </main>
            </RerenderContext.Provider>
            <Footer />
        </FilterContext.Provider>
      );
};

export default Layout;
