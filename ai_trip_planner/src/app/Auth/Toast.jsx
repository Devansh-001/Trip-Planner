import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../Redux/appSlice';
import { Alert } from '@mui/material';

export default function SimpleSnackbar() {

    const dispatch = useDispatch()
    const { alert } = useSelector(store => store.appSlice);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAlert({
            ...alert,
            openSnackbar: false
        }))
    };

    return (
        <div>
            <Snackbar
                open={alert.openSnackbar}
                autoHideDuration={alert.type === "error" ? 5000 : 4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity={alert.type} elevation={10} variant="filled" sx={{ width: "fit", padding: 1 }}>
                    {alert.msg}
                </Alert>

            </Snackbar>

        </div >
    );
}
