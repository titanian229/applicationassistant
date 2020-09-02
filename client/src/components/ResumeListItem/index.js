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
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AssetListItem from '../AssetListItem';

const ResumeListItem = (props) => {
    const { _id, name, notes, handleRemove } = props;
    return (
        <AssetListItem
            primary={name}
            secondary={notes}
            deleteDialogDetails={{ text: 'Remove associated resume?' }}
            icon={<DescriptionIcon />}
            {...props}
        />
    );
};

export default ResumeListItem;
