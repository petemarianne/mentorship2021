import { useMediaQuery } from '@material-ui/core';

export const useScreenSize = () => {
    const desktop = useMediaQuery('(min-width: 769px)');
        return {
            desktop,
            tablet: useMediaQuery('(min-width: 426px)') && !desktop,
            mobile: useMediaQuery('(max-width: 425px)'),
        }
}
