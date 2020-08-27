import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../GlobalStore';
const useStyles = makeStyles((theme) => ({
    message: {},
}));

const Message = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const [{ message, messageDuration }, dispatch] = useGlobalStore();

    useEffect(() => {
        if (message.text === '') {
            // setOpen(false);
            return;
        }
        setOpen(true);
        const timer = setTimeout(() => {
            dispatch({ do: 'clearMessage' });
        }, messageDuration + 1500);
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };
    // TYPES: Error, warning, info, success

    return (
        <Snackbar
            open={open}
            autoHideDuration={messageDuration || 5000}
            onClose={handleClose}
            className={classes.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={message.type || 'info'}>
                {message.text}
            </Alert>
        </Snackbar>
    );
};

export default Message;
