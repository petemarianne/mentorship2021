import { SORT_FILTER } from '../actions/actionTypes';

const sortReducer = (state = '' , action) => {
    switch (action.type) {
        case SORT_FILTER: return action.sort;
        default: return state;
    }
};

export { sortReducer };
