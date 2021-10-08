export const validateAd = (file, fields) => {
    for (let key in fields) {
        if (fields[key] === '') {
            return false;
        }
    }
    return file?.name !== undefined;
}
