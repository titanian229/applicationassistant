import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Checkbox,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useGlobalStore } from '../GlobalStore';

const WrapTooltip = (props) => {
    const { children, tooltipText } = props;

    if (!tooltipText) return <>{children}</>;

    return <Tooltip title={tooltipText}>{children}</Tooltip>;
};

const useStyles = makeStyles((theme) => ({
    checked: {
        textDecoration: 'line-through',
    },
}));

const AssetListItem = (props) => {
    const {
        _id,
        primary,
        secondary,
        tooltipText,
        icon,
        handleRemove,
        deleteDialogDetails: dialogDetails,
        handleClick,
        handleCheck,
        checked,
        indeterminate,
    } = props;
    const [, , { confirmAction }] = useGlobalStore();
    const classes = useStyles();

    const handleDeleteButton = () => {
        handleRemove(_id);
    };

    return (
        <ListItem key={_id}>
            <ListItemAvatar>
                <Avatar>{icon}</Avatar>
            </ListItemAvatar>
            <ListItemText
                {...{ primary, secondary }}
                primaryTypographyProps={{ classes: { root: clsx(checked && classes.checked) } }}
            />
            {handleRemove && (
                <ListItemSecondaryAction>
                    <WrapTooltip tooltipText={tooltipText}>
                        <IconButton
                            edge="end"
                            aria-label="remove"
                            onClick={confirmAction(handleDeleteButton, dialogDetails)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </WrapTooltip>
                </ListItemSecondaryAction>
            )}
            {handleCheck && (
                <ListItemSecondaryAction>
                    <WrapTooltip tooltipText={tooltipText}>
                        <Checkbox edge="end" onChange={handleCheck} checked={checked} indeterminate={indeterminate} />
                    </WrapTooltip>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

export default AssetListItem;
