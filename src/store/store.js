import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { breedReducer } from './reducers/breedReducer';
import { countryReducer } from './reducers/countryReducer';
import { cityReducer } from './reducers/cityReducer';
import { priceFromReducer } from './reducers/priceFromReducer';
import { priceToReducer } from './reducers/priceToReducer';
import { sortReducer } from './reducers/sortReducer';

const rootReducers = combineReducers({
    breed: breedReducer,
    country: countryReducer,
    city: cityReducer,
    priceFrom: priceFromReducer,
    priceTo: priceToReducer,
    sort: sortReducer,
});

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
