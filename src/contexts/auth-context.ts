import { createContext } from 'react';

interface DefaultAuth  {
    sellerID?: string,
    logout: () => void,
    login: (arg0: string) => void;
};

const defaultAuth: DefaultAuth = {
    sellerID: undefined,
    logout: () => {},
    login: arg0 => {},
};

export const AuthContext = createContext(defaultAuth);
