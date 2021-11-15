import React, { createContext } from 'react';

interface DefaultAuth  {
    sellerID?: string,
    setSellerID: React.Dispatch<React.SetStateAction<string | undefined>>
};

const defaultAuth: DefaultAuth = {
    sellerID: undefined,
    setSellerID: () => {},
};

export const AuthContext = createContext(defaultAuth);
