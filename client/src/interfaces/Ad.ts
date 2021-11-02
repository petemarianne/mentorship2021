import { NumericDate } from './NumericDate';

export interface Ad {
    id: string,
    title: string,
    description: string,
    city: string,
    country: string,
    date: NumericDate,
    picture: string,
    sellerID: string,
    status: string,
    price: number,
    docID?: string,
    saleDate?: NumericDate,
    closingDate?: NumericDate,
}
