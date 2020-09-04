import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const MethodDisplay = (props) => {
    const { type, details, _id, handleRemove, handleEdit } = props;
    let methodIcon;
    let secondaryText = '';
    switch (type) {
        case 'email':
            methodIcon = <AlternateEmailIcon />;
            break;
        case 'cell':
        case 'office':
        case 'home':
            methodIcon = <PhoneOutlinedIcon />;
            secondaryText = type[0].toUpperCase() + type.slice(1);
            break;
        case 'address':
            methodIcon = <HomeOutlinedIcon />;
            break;

        default:
            break;
    }

    return (
        <ListItem
            button={Boolean(handleEdit)}
            onClick={Boolean(handleEdit) ? () => handleEdit({ type, details, _id }) : null}
        >
            <ListItemAvatar>
                <Avatar>{methodIcon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={details} secondary={secondaryText} />
            {handleRemove && (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove({ type, details, _id })}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

export default MethodDisplay;
