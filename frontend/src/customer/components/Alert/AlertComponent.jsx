import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../../State/AlertSlice';

const AlertComponent = () => {
    const dispatch = useDispatch();
    const { alert } = useSelector(store => store);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideAlert());
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                variant="filled"
                sx={{ width: '100%', borderRadius: '12px', fontWeight: 'bold' }}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertComponent;
