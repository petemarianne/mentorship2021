import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main/Main';
import Page404 from './pages/Page404/Page404';
import './App.scss';
import './styles/buttons.scss';
import Profile from './pages/Profile/Profile';
import Ad from './pages/Ad/Ad';
import Layout from './components/Layout/Layout';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact><Main /></Route>
                        <Route path='/details'><Ad /></Route>
                        <Route path='/profile'><Profile /></Route>
                        <Route path='*' render={() => <Page404 />} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
};

export default App;
