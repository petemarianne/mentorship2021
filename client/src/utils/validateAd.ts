import { Fields } from '../interfaces';

export const validateAd = (file: File | undefined, fields: Fields) => {
    for (let key in fields) {
        // @ts-ignore
        if (fields[key] === '') {
            return false;
        }
    }
    return file?.name !== undefined;
}
