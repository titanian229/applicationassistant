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
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../utils/formatDate'

const TodoListItem = (props) => {
    const { _id, name, date, handleRemove } = props;
    return (
        <ListItem key={_id}>
            <ListItemAvatar>
                <Avatar>
                    <AddAlertIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={date && formatDate(date)} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(_id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default TodoListItem;
