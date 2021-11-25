import { useState } from 'react';

export const useFetchError = () => {
    const [error, setError] = useState<null | Error>(null);

    const request = async (input:  RequestInfo, init?: RequestInit) => {
        const response = await fetch(input, init);
        if (response.status === 401) {
            setError(new Error('???'));
        } else {
            return await response.json();
        }
    };

    return { request, error };
}
