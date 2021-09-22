import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { breedReducer } from './reducers/breedReducer';
import { countryReducer } from './reducers/countryReducer';
import { cityReducer } from './reducers/cityReducer';
import { priceReducer } from './reducers/priceReducer';

const rootReducers = combineReducers({
    breed: breedReducer,
    country: countryReducer,
    city: cityReducer,
    price: priceReducer,
    /*priceFrom: priceFromReducer,
    priceTo: priceToReducer,
    sort: sortReducer,*/

});

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
