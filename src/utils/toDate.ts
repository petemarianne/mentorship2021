import { NumericDate } from '../interfaces';

export const toDate = (date: NumericDate): Date => {
    return new Date(date.seconds * 1000);
};
