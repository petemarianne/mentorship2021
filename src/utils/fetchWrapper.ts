import React from 'react';

export const fetchWrapper = (setError:  React.Dispatch<React.SetStateAction<boolean>>, fetch: (input:  RequestInfo, init?: RequestInit) => Promise<Response>, input:  RequestInfo, init?: RequestInit):  Promise<any> => {
    return fetch(input, init).then((response) => {
        if (response.status === 401) {
            setError(true);
        } else {
            return response.json();
        }
    });
}
