import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const AddButton = (props) => {
    const { onClick } = props;
    return (
        <Grid container justify="center" alignItems="center">
            <IconButton onClick={onClick}>
                <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </Grid>
    );
};

export default AddButton;
