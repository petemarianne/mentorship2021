export const filterAds= (item, filter) => {
    if (item.status !== 'active') {
        return false;
    }
    let result = true;
    if (filter.breed !== '') {
        if (item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1 && item.description.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1) {
            return false;
        } else {
            result = item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) || item.description.toLowerCase().indexOf(filter.breed.toLowerCase());
        }
    }
    if (filter.country !== '') {
        result = result && filter.country.toLowerCase() === item.country.toLowerCase();
    }
    if (filter.city !== '') {
        result = result && filter.city.toLowerCase() === item.city.toLowerCase();
    }
    if (filter.priceFrom !== '') {
        result = result && Number(filter.priceFrom) <= Number(item.price);
    }
    if (filter.priceTo !== '') {
        result = result && Number(filter.priceTo) >= Number(item.price);
    }
    return result;
}
