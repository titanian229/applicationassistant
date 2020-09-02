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
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../utils/formatDate';
import AssetListItem from '../AssetListItem';
import { useGlobalStore } from '../GlobalStore';

const TodoListItem = (props) => {
    const { _id, name, date, handleRemove, completed } = props;
    const [checked, setChecked] = useState(completed || false);
    const [indeterminate, setIndeterminate] = useState(false)
    const [, dispatch, { API, processServerResponse }] = useGlobalStore();

    const handleCheck = async () => {
        // send put req to server to toggle it
        // dispatch({ do: 'setLoading', loading: true });
        setIndeterminate(true)
        const serverResponse = await API.toggleTodo(_id, !checked);
        const serverUp = processServerResponse(serverResponse);
        // dispatch({ do: 'setLoading', loading: false });
        setIndeterminate(false)
        if (serverUp === false) return;
        if (serverResponse.todo) {
            setChecked(serverResponse.todo.completed);
        }
        // change the displayed value
        // setChecked(!checked);
    };

    return (
        <AssetListItem
            primary={name}
            secondary={date && formatDate(date)}
            icon={<AddAlertIcon />}
            checked={checked}
            handleCheck={handleCheck}
            indeterminate={indeterminate}
            {...props}
        />
    );
};

export default TodoListItem;
