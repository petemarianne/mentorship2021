import { COUNTRY_FILTER } from '../actions/actionTypes';

const countryReducer = ( state = '' , action) => {
    switch (action.type) {
        case COUNTRY_FILTER: return action.country;
        default: return state;
    }
};

export { countryReducer };