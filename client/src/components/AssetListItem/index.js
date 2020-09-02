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
import DeleteIcon from '@material-ui/icons/Delete';

const AssetListItem = (props) => {
    const { _id, primary, secondary, icon, handleRemove, handleClick } = props;

    return (
        <ListItem key={_id}>
            <ListItemAvatar>
                <Avatar>{icon}</Avatar>
            </ListItemAvatar>
            <ListItemText {...{ primary, secondary }} />
            {handleRemove && (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(_id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

export default AssetListItem;
