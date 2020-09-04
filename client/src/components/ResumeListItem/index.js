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
    const { resume, handleRemove, viewResume } = props;
    const { name, notes } = resume

    const viewItem = () => {
        viewResume(resume);
    };

    return (
        <AssetListItem
            primary={name}
            secondary={notes}
            icon={<DescriptionIcon />}
            deleteDialogDetails={{ text: 'Remove associated resume?' }}
            viewItem={Boolean(viewResume) ? viewItem : ''}
            asset={resume}
            {...props}
        />
    );
};

export default ResumeListItem;
