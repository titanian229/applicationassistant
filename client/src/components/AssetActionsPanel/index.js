import React from 'react';
import {
    IconButton,
    Tooltip,
    Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const AssetActionsPanel = (props) => {
    const { handleEdit, handleDelete, handleDissociate, asset } = props;

    return (
        <Grid container justify="space-evenly">
            {handleEdit && (
                <IconButton onClick={() => handleEdit(asset)}>
                    <EditOutlinedIcon />
                </IconButton>
            )}
            {handleDissociate && (
                <IconButton onClick={() => handleDissociate(asset)}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
            )}
            {handleDelete && (
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            )}
        </Grid>
    );
};

export default AssetActionsPanel