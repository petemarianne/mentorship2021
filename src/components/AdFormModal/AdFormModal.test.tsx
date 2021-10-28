import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdFormModal from './AdFormModal';
import userEvent from '@testing-library/user-event';

describe('New ad form modal component:', () => {
    const handleClose = jest.fn();

    beforeEach(() => {
        render(<AdFormModal handleClose={handleClose} />);
    })

    test('New ad from modal renders', () => {})

    test('All static text renders', () => {
        expect(screen.getByText('NEW AD FORM')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
    })

    test('Close button renders', () => {
        expect(screen.getByTestId('close-button')).toBeInTheDocument();

        userEvent.click(screen.getByTestId('close-button'));
        expect(handleClose).toBeCalled();
    })

    test('Publish button renders', () => {
        const button: HTMLElement = screen.getByTestId('publish-button');
        expect(button).toBeInTheDocument();
        expect(screen.getByText('Publish')).toBeInTheDocument();
    })

    test('Submit form', () => {
        userEvent.click(screen.getByText('Publish'));
        expect(screen.getByTestId('validate')).toBeInTheDocument();
        expect(screen.getByText('Fill in all the fields!')).toBeInTheDocument();
        screen.getAllByTestId('text-input').map((item) => {
            userEvent.type(item, 'test');
        })
        userEvent.upload(screen.getByLabelText('Upload File'), [new File([], 'img'),]);
        userEvent.click(screen.getByText('Publish'));
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    })

    test('Text inputs renders', () => {
        screen.getAllByTestId('text-input').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(4);
        })
    })

    test('Initial text render', () => {
        expect(screen.getByTestId('drug-and-drop-area')).toBeInTheDocument();
        expect(screen.getByText('Drag a picture!')).toBeInTheDocument();
        expect(screen.getByText('or')).toBeInTheDocument();
        expect(screen.getByText('Upload File')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();
    })

    test('Drag start, over and leave', () => {
        const area: HTMLElement = screen.getByTestId('drug-and-drop-area');
        fireEvent.dragStart(area);
        expect(screen.getByText('Drop a picture!')).toBeInTheDocument();
        fireEvent.dragLeave(area);
        expect(screen.getByText('Drag a picture!')).toBeInTheDocument();
        expect(screen.getByText('or')).toBeInTheDocument();
        expect(screen.getByText('Upload File')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();
        fireEvent.dragOver(area);
        expect(screen.getByText('Drop a picture!')).toBeInTheDocument();
    })

    test('Drop file', () => {
        fireEvent.dragOver(screen.getByTestId('drug-and-drop-area'));
        fireEvent.drop(screen.getByTestId('drug-and-drop-area'), {
            dataTransfer: {
                files: [new File([], 'img'),],
            }
        });
        expect(screen.getByText('img')).toBeInTheDocument();
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
        fireEvent.dragOver(screen.getByTestId('drug-and-drop-area'));
        fireEvent.drop(screen.getByTestId('drug-and-drop-area'), {
            dataTransfer: {
                files: [new File([], 'img1'),],
            }
        });
        expect(screen.getByText('img1')).toBeInTheDocument();
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
    })

    test('Upload file', () => {
        userEvent.upload(screen.getByLabelText('Upload File'), [new File([], 'img'),]);
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('img')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
        userEvent.upload(screen.getByLabelText('Upload Another File'), [new File([], 'img1'),]);
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('img1')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
    })
})
