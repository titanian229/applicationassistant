import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


const MethodDisplay = (props) => {
    const { type, details, phoneType, _id, handleRemove, handleEdit } = props;
    let methodIcon;
    switch (type) {
        case 'email':
            methodIcon = <AlternateEmailIcon />;
            break;
        case 'phone':
            methodIcon = <PhoneOutlinedIcon />;
            break;
        case 'address':
            methodIcon = <HomeOutlinedIcon />;
            break;

        default:
            break;
    }

    return (
        <ListItem button onClick={() => handleEdit({type, details, _id})}>
            <ListItemAvatar>
                <Avatar>{methodIcon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={details} secondary={phoneType ? phoneType[0].toUpperCase() + phoneType.substring(1) : undefined} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove({ type, details, _id })}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default MethodDisplay