import { Fields } from '../interfaces';

export const validateAd = (file: File | undefined, fields: Fields, isEdit: boolean) => {
    for (let key in fields) {
        // @ts-ignore
        if (fields[key] === '') {
            return false;
        }
    }
    return isEdit ? true : file?.name !== undefined;
}
