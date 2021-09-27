import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './pages/Main/Main';
import Page404 from './pages/Page404/Page404';
import './App.scss';
import './styles/buttons.scss';
import Profile from './pages/Profile/Profile';
import Ad from './pages/Ad/Ad';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact><Main /></Route>
                    <Route path='/profile' exact><Profile /></Route>
                    <Route path='/ad' exact><Ad /></Route>
                    <Route path='*' render={() => <Page404 />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
