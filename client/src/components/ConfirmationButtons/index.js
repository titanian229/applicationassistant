import React from 'react';
import { Grid, Button } from '@material-ui/core';

const ConfirmationButtons = (props) => {
    const { handleClose, handleSave } = props;

    return (
        <Grid container justify="center">
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
        </Grid>
    );
};

export default ConfirmationButtons;
