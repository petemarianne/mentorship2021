import { NumericDate } from './NumericDate';

export interface User {
    activeAds: number,
    avatar: string,
    date: NumericDate,
    email: string,
    id: string,
    name: string,
    phone: string,
    password?: string
}
