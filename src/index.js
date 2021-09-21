import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.render(
    <AppContainer />,
    document.getElementById('root')
);
