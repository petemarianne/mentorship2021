import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './styles/buttons.scss';
import Layout from './components/Layout/Layout';
import { Main, Ad, Profile, MyProfile, ErrorPage } from './pages';
import { useAuth } from './hooks';
import { AuthContext } from './contexts/auth-context';
import { ErrorBoundary } from 'react-error-boundary';

const App: React.FC = (): JSX.Element => {
    const {sellerID, token, login, logout} = useAuth();

    const isAuthorized = !!token;

    function ErrorFallback() {
        logout();

        return <ErrorPage is401={true} />;
    }

    return (
        <div className='App'>
            <BrowserRouter>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <AuthContext.Provider value={{sellerID, token, login, logout}}>
                            <Layout>
                                <Switch>
                                    <Route path='/' exact><Main /></Route>
                                    <Route path='/ad:id'><Ad /></Route>
                                        {isAuthorized ? <Route path='/myprofile'><MyProfile /></Route> : null}
                                    <Route path='/profile:id'><Profile /></Route>
                                    <Route path='*' render={() => <ErrorPage />} />
                                </Switch>
                            </Layout>
                    </AuthContext.Provider>
                </ErrorBoundary>
            </BrowserRouter>
        </div>
    );
};

export default App;
