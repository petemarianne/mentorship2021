import React, { useState } from 'react';
import { Button } from '@material-ui/core';

interface PicUploadProps {
    file: File | undefined,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
};

const PicUpload: React.FC<PicUploadProps> = (props): JSX.Element => {
    const [drag, setDrag] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);

    const dragStartHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        props.setFile(file);
        setDrag(false);
        setUploaded(true);
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            props.setFile(file);
            setDrag(false);
            setUploaded(true);
        }
    };

    const uploadedJSX =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{props.file?.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input data-testid='upload-another-file' type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button' data-testid='upload-button'>
                Upload File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dropJSX = <div>Drop a picture!</div>;

    return (
        <div onDragStart={dragStartHandle}
             onDragLeave={dragLeaveHandle}
             onDragOver={dragStartHandle}
             onDrop={drag ? onDropHandler : undefined}
             className='drag-and-drop-wrapper'
             style={drag ? {padding: '55px 0'} : undefined}
             data-testid='drug-and-drop-area'
        >
            {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
        </div>
    )
}

export default PicUpload;
