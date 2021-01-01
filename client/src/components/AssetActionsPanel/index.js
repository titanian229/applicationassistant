import React from 'react';
import {
    IconButton,
    // Tooltip,
    Grid,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    iconButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const AssetActionsPanel = (props) => {
    const { handleEdit, handleDelete, handleDissociate, asset, sideComponent } = props;
    const classes = useStyles();

    return (
        <Grid container justify="space-evenly">
            {handleEdit && (
                <>
                    <IconButton className={classes.iconButton} onClick={() => handleEdit(asset)}>
                        <EditOutlinedIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<EditOutlinedIcon />}
                    >
                        Edit
                    </Button>
                </>
            )}
            {handleDissociate && (
                <>
                    <IconButton className={classes.iconButton} onClick={() => handleDissociate(asset)}>
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<HighlightOffOutlinedIcon />}
                    >
                        Remove
                    </Button>
                </>
            )}
            {handleDelete && (
                <>
                    <IconButton className={classes.iconButton} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <Button variant="contained" color="delete" className={classes.button} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </>
            )}

            {sideComponent}
        </Grid>
    );
};

export default AssetActionsPanel;
