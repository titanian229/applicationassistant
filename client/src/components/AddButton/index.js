import React from 'react';
import { Grid, IconButton, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    buttonRoot: {
        padding: theme.spacing(0),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
    },
}));

const AddButton = (props) => {
    const { onClick, pageAdd } = props;
    const classes = useStyles();
    return (
        <>
            {!pageAdd && (
                <Grid container justify="center" alignItems="center">
                    <IconButton classes={{ root: classes.buttonRoot }} onClick={onClick}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            )}
            {pageAdd && (
                <Fab className={classes.fab} onClick={onClick} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            )}
        </>
    );
};

export default AddButton;
