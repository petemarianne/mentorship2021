import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AdFormModal } from './AdFormModal';

describe('New ad form modal component:', () => {
    test('New ad from modal renders', () => {
        render(<AdFormModal />);
    })

    test('All static text renders', () => {
        render(<AdFormModal />);
        expect(screen.getByText('NEW AD FORM')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
    })

    test('Button renders', () => {
        expect(screen.getByTestId('publish-button')).toBeInTheDocument();
    })
})