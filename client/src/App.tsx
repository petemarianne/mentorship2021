import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './styles/buttons.scss';
import Layout from './components/Layout/Layout';
import { Main, Ad, Profile, MyProfile, Page404 } from './pages';

const App: React.FC = ():JSX.Element => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact><Main /></Route>
                        <Route path='/ad:id'><Ad /></Route>
                        <Route path='/myprofile'><MyProfile /></Route>
                        <Route path='/profile:id'><Profile /></Route>
                        <Route path='*' render={() => <Page404 />} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
};

export default App;
