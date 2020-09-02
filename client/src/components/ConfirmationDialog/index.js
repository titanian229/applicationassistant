import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useGlobalStore } from '../GlobalStore';

const ConfirmationDialog = (props) => {
    // const { open, handleClose, dialogText, confirmationText } = props;
    // const { handleConfirm, dialogText, confirmationText } = props;
    const [globalStore, dispatch] = useGlobalStore();
    const { open, handleConfirm: handleConfirmCallback, text, confirmText } = globalStore.confirmationDialog;

    const handleClose = () => {
        dispatch({do: 'closeConfirmation'})
    };

    const handleConfirm = () => {
        dispatch({do: 'closeConfirmation'})
        handleConfirmCallback()
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-describedby="confirmation-dialog-description">
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    {confirmText || 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
