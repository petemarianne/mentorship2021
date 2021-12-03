import React, { createContext } from 'react';

interface DefaultRerenderInterface {
    rerender: boolean,
    setRerender:  React.Dispatch<React.SetStateAction<boolean>>,
}

const defaultRerenderInterface: DefaultRerenderInterface = {
    rerender: false,
    setRerender: () => {},
};

export const RerenderContext = createContext(defaultRerenderInterface);