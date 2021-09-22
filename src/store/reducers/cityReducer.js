import { CITY_FILTER } from '../actions/actionTypes';

const cityReducer = (state = '' , action) => {
    switch (action.type) {
        case CITY_FILTER: return action.city;
        default: return state;
    }
};

export { cityReducer };