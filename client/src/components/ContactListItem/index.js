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
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';

const ContactListItem = (props) => {
    const { _id, name, roleTitle, businessName, handleRemove } = props;
    return (
        <ListItem key={name + roleTitle}>
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={roleTitle} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(_id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ContactListItem;
