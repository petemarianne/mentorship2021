import React, { useState } from 'react';
import './DrugAndDropArea.scss';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const DrugAndDropArea = (props) => {
    const {file, setFile} = props;

    const [drag, setDrag] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const dragStartHandle = (event) => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event) => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    };

    const uploadedJSX =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{file.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input data-testid='upload-file' type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button' data-testid='upload-button'>
                Upload File
                <input type='file' onChange={onFileChange} data-testid='upload-file' hidden/>
            </Button>
        </>;

    const dropJSX = <div>Drop a picture!</div>;

    return (
        <div onDragStart={dragStartHandle}
             onDragLeave={dragLeaveHandle}
             onDragOver={dragStartHandle}
             onDrop={drag ? onDropHandler : null}
             className='drag-and-drop-wrapper'
             style={drag ? {padding: '55px 0'} : null}
             data-testid='drug-and-drop-area'
        >
            {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
        </div>
    );
}

DrugAndDropArea.propTypes = {
    file: PropTypes.object,
    setFile: PropTypes.func,
};

export default DrugAndDropArea;
