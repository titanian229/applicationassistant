import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Paper,
    Grid,
    Box,
    Container,
    Select,
    Input,
    InputLabel,
    Checkbox,
    MenuItem,
    FormControl,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    inputField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const InputField = (props) => {
    const classes = useStyles();
    const { name, type, handleChange, values, label, required, multiline, rows, className } = props;

    return (
        <TextField
            className={clsx(classes.inputField, className)}
            onChange={handleChange(name, type || 'text')}
            value={values[name]}
            label={label}
            type="text"
            variant="outlined"
            required={required}
            rows={rows || undefined}
            multiline={multiline || false}
        />
    );
};

export default InputField;
