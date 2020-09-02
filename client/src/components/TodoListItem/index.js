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
import formatDate from '../../utils/formatDate';
import AssetListItem from '../AssetListItem';

const TodoListItem = (props) => {
    const { _id, name, date, handleRemove } = props;
    return <AssetListItem primary={name} secondary={date && formatDate(date)} icon={<AddAlertIcon />} {...props} />;
};
// TODO change handleRemove for this to remove it from the DB as well.

export default TodoListItem;
