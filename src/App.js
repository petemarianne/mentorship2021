import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact><Main /></Route>
                    <Route path='*' render={() => <div>error</div>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
