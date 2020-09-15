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
    const { _id, name, date, completed, viewTodo, refreshTodos } = props;
    const [checked, setChecked] = useState(completed || false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [, , { API, processServerResponse }] = useGlobalStore();

    const handleCheck = async () => {
        // send put req to server to toggle it
        let todo = {name, date, _id}
        setIndeterminate(true);
        console.log("handleCheck -> todo", todo)
        const serverResponse = await API.updateTodo({_id, name, date, completed: !checked });
        const serverUp = processServerResponse(serverResponse);
        setIndeterminate(false);
        if (serverUp === false) return;
        if (serverResponse.todo) {
            setChecked(serverResponse.todo.completed);
            if (refreshTodos) refreshTodos()
        }
    };

    const viewItem = () => {
        viewTodo({ _id, name, date });
    };

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
