import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AdFormModal } from './AdFormModal';
import userEvent from '@testing-library/user-event';

describe('New ad form modal component:', () => {
    const handleClose = jest.fn();

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

    test('Close button renders', () => {
        render(<AdFormModal handleClose={handleClose}/>);
        expect(screen.getByTestId('close-button')).toBeInTheDocument();

        userEvent.click(screen.getByTestId('close-button'));
        expect(handleClose).toBeCalled();
    })

    test('Publish button renders', () => {
        render(<AdFormModal />);
        const button = screen.getByTestId('publish-button');
        expect(button).toBeInTheDocument();
        expect(screen.getByText('Publish')).toBeInTheDocument();
    })

    test('Submit form', () => {
        render(<AdFormModal />);
        userEvent.click(screen.getByText('Publish'));
        expect(screen.getByTestId('validate')).toBeInTheDocument();
        expect(screen.getByText('Fill in all the fields!')).toBeInTheDocument();
    })

    test('Text inputs renders', () => {
        render(<AdFormModal />);
        screen.getAllByTestId('text-input').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(4);
        })
    })
})

// submit -> loading -> handleClose
