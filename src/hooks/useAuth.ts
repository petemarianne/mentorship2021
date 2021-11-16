import { useState } from 'react';

export const useAuth = () => {
    const [sellerID, setSellerID] = useState<string | undefined>(undefined);
    
    const logout = (): void => {
        setSellerID(undefined);
        localStorage.setItem('token', '');
    };

    const login = (token: string): void => {
        fetch('/api/auth/login', {method: 'GET', headers: {'Authorization': token}})
            .then(response => response.json())
            .then(data => setSellerID(data.userID));
    };

    return {
        sellerID,
        login,
        logout
    };
};
