export interface User {
    activeAds: number,
    avatar: string,
    date: {
        seconds: number,
        nanoseconds: number
    },
    email: string,
    id: string,
    name: string,
    phone: string,
}
