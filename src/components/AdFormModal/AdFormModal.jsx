import React from 'react';
import PropTypes from 'prop-types';
import './AdFormModal.scss';


export const AdFormModal = ({handleClose}) => {
    return (
        <div className='submit-modal'>
            ad form modal
        </div>
    );
};

AdFormModal.propTypes = {
    handleClose: PropTypes.func,
};
