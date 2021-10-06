import { useMediaQuery } from '@material-ui/core';

export const useScreenSize = () => {
    return {
        desktop: useMediaQuery('(min-width: 769px)'),
        tablet: useMediaQuery('(min-width: 426px)'),
        mobile: useMediaQuery('(max-width: 425px)'),
    }
}
