import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    buttonRoot: {
        padding: theme.spacing(0),
    },
}));

const AddButton = (props) => {
    const { onClick } = props;
    const classes = useStyles();
    return (
        <Grid container justify="center" alignItems="center">
            <IconButton classes={{ root: classes.buttonRoot }} onClick={onClick}>
                <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </Grid>
    );
};

export default AddButton;
