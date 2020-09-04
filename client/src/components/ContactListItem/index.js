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
import AssetListItem from '../AssetListItem';

const ContactListItem = (props) => {
    const { contact, handleRemove, viewContact } = props;
    const { name, roleTitle } = contact;

    const viewItem = () => {
        viewContact(contact);
    };

    return (
        <AssetListItem
            primary={name}
            secondary={roleTitle}
            icon={<PersonIcon />}
            deleteDialogDetails={{ text: 'Remove associated contact?' }}
            viewItem={Boolean(viewContact) ? viewItem : ''}
            asset={contact}
            {...props}
        />
    );
};

export default ContactListItem;
