import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const AppContainer = () => {
    return (
        <App />
    );
};

ReactDOM.render(
    <AppContainer />,
    document.getElementById('root')
);
