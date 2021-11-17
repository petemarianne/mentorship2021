import { createContext } from 'react';

interface DefaultAuth  {
    sellerID: string | null,
    token: string | null,
    login: (arg0: string, arg: string) => void,
    logout: () => void,
};

const defaultAuth: DefaultAuth = {
    sellerID: null,
    token: null,
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext(defaultAuth);
