export interface Ad {
    id: string,
    title: string,
    description: string,
    city: string,
    country: string,
    date: {
        seconds: number,
        nanoseconds: number
    },
    picture: string,
    sellerID: string,
    status: string,
    price: number,
    docID?: string,
    saleDate?: {
        seconds: number,
        nanoseconds: number
    },
    closingDate?: {
        seconds: number,
        nanoseconds: number
    },
}
