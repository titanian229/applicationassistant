import React, { useState } from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import {
//     ListItem,
//     ListItemText,
//     ListItemIcon,
//     Avatar,
//     ListItemAvatar,
//     ListItemSecondaryAction,
//     IconButton,
// } from '@material-ui/core';
import formatDate from '../../utils/formatDate';
import AssetListItem from '../AssetListItem';
import { useGlobalStore } from '../GlobalStore';

const TodoListItem = (props) => {
    const { _id, name, date, completed, viewTodo } = props;
    const [checked, setChecked] = useState(completed || false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [, , { API, processServerResponse }] = useGlobalStore();

    const handleCheck = async () => {
        // send put req to server to toggle it
        setIndeterminate(true);
        const serverResponse = await API.toggleTodo(_id, !checked);
        const serverUp = processServerResponse(serverResponse);
        setIndeterminate(false);
        if (serverUp === false) return;
        if (serverResponse.todo) {
            setChecked(serverResponse.todo.completed);
        }
    };

    const viewItem = () => {
        viewTodo({_id, name, date})
    }

    return (
        <AssetListItem
            primary={name}
            secondary={date && formatDate(date)}
            // icon={<AddAlertIcon />}
            checked={checked}
            handleCheck={handleCheck}
            indeterminate={indeterminate}
            viewItem={viewItem}
            {...props}
        />
    );
};

export default TodoListItem;
