import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './styles/buttons.scss';
import Layout from './components/Layout/Layout';
import { Main, Ad, Profile, MyProfile, Page404 } from './pages';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './contexts/auth-context';

const App: React.FC = (): JSX.Element => {
    const {sellerID, token, login, logout} = useAuth();

    const isAuthorized = !!token;

    return (
        <div className='App'>
            <BrowserRouter>
                <AuthContext.Provider value={{sellerID, token, login, logout}}>
                    <Layout>
                        <Switch>
                            <Route path='/' exact><Main /></Route>
                            <Route path='/ad:id'><Ad /></Route>
                            {isAuthorized ? <Route path='/myprofile'><MyProfile /></Route> : null}
                            <Route path='/profile:id'><Profile /></Route>
                            <Route path='*' render={() => <Page404 />} />
                        </Switch>
                    </Layout>
                </AuthContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
