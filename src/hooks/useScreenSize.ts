import { useMediaQuery } from '@material-ui/core';

interface ScreenSize {
    desktop: boolean,
    tablet: boolean,
    mobile: boolean,
}

export const useScreenSize = (): ScreenSize => {
    const desktop: boolean = useMediaQuery('(min-width: 769px)');
        return {
            desktop,
            tablet: useMediaQuery('(min-width: 426px)') && !desktop,
            mobile: useMediaQuery('(max-width: 425px)'),
        }
}
