import React from 'react';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import formatDate from '../../utils/formatDate';
import AssetListItem from '../AssetListItem';

const TodoListItem = (props) => {
    const { name, date } = props.todo;
    return (
        <AssetListItem
            primary={name}
            secondary={date && formatDate(date)}
            icon={<AddAlertIcon />}
            removeText="Delete Todo?"
            deleteDialogDetails={{ text: 'Delete Todo?', confirmText: 'Delete' }}
            asset={props.todo}
            {...props}
        />
    );
};
// TODO change handleRemove for this to remove it from the DB as well.

export default TodoListItem;
