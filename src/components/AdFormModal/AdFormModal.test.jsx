import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    test('Submit form', async () => {
        render(<AdFormModal handleClose={handleClose}/>);
        userEvent.click(screen.getByText('Publish'));
        expect(screen.getByTestId('validate')).toBeInTheDocument();
        expect(screen.getByText('Fill in all the fields!')).toBeInTheDocument();
        screen.getAllByTestId('text-input').map((item) => {
            userEvent.type(item, 'test');
        })
        userEvent.upload(screen.getByTestId('upload-file'), [new File([], 'img'),]);
        userEvent.click(screen.getByText('Publish'));
        await waitFor(() => expect(screen.getByTestId('loading')).toBeInTheDocument());
    })

    test('Text inputs renders', () => {
        render(<AdFormModal />);
        screen.getAllByTestId('text-input').map((item, index) => {
            expect(item).toBeInTheDocument();
            expect(index).toBeLessThanOrEqual(4);
        })
    })

    test('Initial text render', () => {
        render(<AdFormModal />);
        expect(screen.getByTestId('drug-and-drop-area')).toBeInTheDocument();
        expect(screen.getByText('Drag a picture!')).toBeInTheDocument();
        expect(screen.getByText('or')).toBeInTheDocument();
        expect(screen.getByText('Upload File')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();
    })

    test('Drag start, over and leave', () => {
        render(<AdFormModal />);
        const area = screen.getByTestId('drug-and-drop-area');
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
        render(<AdFormModal />);
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
        render(<AdFormModal />);
        userEvent.upload(screen.getByTestId('upload-file'), [new File([], 'img'),]);
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('img')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
        userEvent.upload(screen.getByTestId('upload-another-file'), [new File([], 'img1'),]);
        expect(screen.getByText('Uploaded!')).toBeInTheDocument();
        expect(screen.getByText('img1')).toBeInTheDocument();
        expect(screen.getByText('Upload Another File')).toBeInTheDocument();
    })
})

// submit -> loading -> handleClose
// text input
