import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Page404 from './pages/Page404/Page404';
import './App.css';
import './styles/buttons.scss';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact><Main /></Route>
                    <Route path='*' render={() => <Page404 />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
