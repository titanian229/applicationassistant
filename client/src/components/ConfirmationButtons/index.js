import React from 'react';
import { Grid, Button } from '@material-ui/core';
import ResponsiveSave from '../ResponsiveSave';
import {useGlobalStore} from '../GlobalStore'

const ConfirmationButtons = (props) => {
    const { handleClose, handleSave, handleDelete } = props;
    const [, , {confirmAction}] = useGlobalStore()
    // TODO create responsive save button, use here.  Have it check the globalStore's loading state
    return (
        <Grid container justify="center">
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            {handleDelete && (
                <Button onClick={confirmAction(handleDelete, {text: 'Are you sure?', confirmText: "Delete"})}>
                    Delete
                </Button>
            )}
            {/* <Button onClick={handleSave} color="primary">
                Save
            </Button> */}
            <ResponsiveSave onClick={handleSave} />
        </Grid>
    );
};

export default ConfirmationButtons;
