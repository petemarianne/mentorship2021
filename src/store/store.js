import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { breedReducer } from './reducers/breedReducer';

const rootReducers = combineReducers({
    breed: breedReducer,
});

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
