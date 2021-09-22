import { PRICE_TO_FILTER } from '../actions/actionTypes';

const priceToReducer = (state = '' , action) => {
    switch (action.type) {
        case PRICE_TO_FILTER: return action.priceTo;
        default: return state;
    }
};

export { priceToReducer };
