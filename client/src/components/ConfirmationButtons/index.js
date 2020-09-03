import React from 'react';
import { Grid, Button } from '@material-ui/core';
import ResponsiveSave from '../ResponsiveSave';
const ConfirmationButtons = (props) => {
    const { handleClose, handleSave, handleDelete } = props;
    // TODO create responsive save button, use here.  Have it check the globalStore's loading state
    return (
        <Grid container justify="center">
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            {handleDelete && (
                <Button onClick={handleDelete}>
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
