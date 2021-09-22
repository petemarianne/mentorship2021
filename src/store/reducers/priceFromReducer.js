import { PRICE_FROM_FILTER } from '../actions/actionTypes';

const priceFromReducer = (state = '' , action) => {
    switch (action.type) {
        case PRICE_FROM_FILTER: return action.priceFrom;
        default: return state;
    }
};

export { priceFromReducer };
