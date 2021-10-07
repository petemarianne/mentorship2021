import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './AdFormModal.scss';
import {Button, IconButton, InputBase} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";


export const AdFormModal = ({handleClose}) => {
    const [drag, setDrag] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [file, setFile] = useState({});

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
        //console.log(file);
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
        //console.log(file);
    };

    const uploadedJSX =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{file.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button'>
                Upload File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dropJSX = <div>Drop a picture!</div>;

    return (
        <div className='new-ad-modal'>
            <div className='close-icon-button-wrapper'>
                <IconButton aria-label='lose' size='medium' onClick={handleClose}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
            </div>
            <div className='modal-header'>NEW AD FORM</div>
            <div className='filter-name'>Title</div>
            <div className='input'>
                <InputBase fullWidth/>
            </div>
            <div className='location-input'>
                <div>
                    <div className='filter-name country'>Country</div>
                    <div className='input country'>
                        <InputBase fullWidth/>
                    </div>
                </div>
                <div>
                    <div className='filter-name city'>City</div>
                    <div className='input city'>
                        <InputBase fullWidth/>
                    </div>
                </div>
            </div>
            <div className='filter-name'>Description</div>
            <div className='input description'>
                <InputBase maxRows={7} multiline fullWidth/>
            </div>
            <div className='filter-name'>Price</div>
            <div className='price-input-picture-button-wrapper'>
                <div className='price-input-button-wrapper'>
                    <div className='input price'>
                        <InputBase fullWidth/>
                    </div>
                    <Button className='publish-button' variant='contained' color='primary'>Publish</Button>
                </div>
                <div onDragStart={dragStartHandle}
                     onDragLeave={dragLeaveHandle}
                     onDragOver={dragStartHandle}
                     onDrop={drag ? onDropHandler : null}
                     className='drag-and-drop-wrapper'
                     style={drag ? {padding: '55px 0'} : null}>
                    {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
                </div>
            </div>
        </div>
    );
};

AdFormModal.propTypes = {
    handleClose: PropTypes.func,
};
