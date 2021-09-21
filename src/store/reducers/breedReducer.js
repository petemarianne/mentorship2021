import { BREED_SEARCH } from '../actions/actionTypes';

const breedReducer = ( state = '' , action) => {
    switch (action.type) {
        case BREED_SEARCH: return action.breed;
        default: return state;
    }
};

export { breedReducer };
