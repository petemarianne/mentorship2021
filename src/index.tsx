import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const AppContainer: React.FC = (): JSX.Element => {
    return (
        <App />
    );
};

ReactDOM.render(
    <AppContainer />,
    document.getElementById('root')
);
