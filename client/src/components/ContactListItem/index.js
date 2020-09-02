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
    const { _id, name, roleTitle, businessName, handleRemove } = props;
    return <AssetListItem primary={name} secondary={roleTitle} icon={<PersonIcon />} {...props} />;
};

export default ContactListItem;
