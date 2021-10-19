import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DrugAndDropArea from './DrugAndDropArea';

describe('Drug and drop area:', () => {

    test('Initial text render', () => {
        render(<DrugAndDropArea file={new File([], 'file')}/>);
        expect(screen.getByTestId('drug-and-drop-area')).toBeInTheDocument();
        expect(screen.getByText('Drag a picture!')).toBeInTheDocument();
        expect(screen.getByText('or')).toBeInTheDocument();
        expect(screen.getByText('Upload File')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();
    })

    test('Drag start, over and leave', () => {
        render(<DrugAndDropArea file={new File([], 'file')}/>);
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

    /*test('Drop file', async () => {
        render(<DrugAndDropArea file={new File([], 'file')}/>);
        fireEvent.dragOver(screen.getByTestId('drug-and-drop-area'));
        fireEvent.drop(screen.getByTestId('drug-and-drop-area'), {
            dataTransfer: {
                files: [img],
            }
        });
        await waitFor(() => expect(screen.getByText('Uploaded!')).toBeInTheDocument());
    })

    test('Upload file', async () => {
        render(<DrugAndDropArea file={new File([], 'file')}/>);
        userEvent.upload(screen.getByTestId('upload-file'), [img]);
        await waitFor(() => expect(screen.getByText('Uploaded!')).toBeInTheDocument());
    })*/
})

// drop
// upload file through the button
// re-upload
