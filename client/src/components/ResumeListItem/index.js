import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';

const ResumeListItem = (props) => {
    const { _id, name, notes, handleRemove } = props;
    return (
        <ListItem key={_id}>
            <ListItemAvatar>
                <Avatar>
                    <DescriptionIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={notes} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(_id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ResumeListItem;
