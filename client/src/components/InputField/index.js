import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inputField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const InputField = (props) => {
    const classes = useStyles();
    const { name, type, handleChange, values, label, required, multiline, rows, className, ...rest } = props;
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
            {...{rest}}
        />
    );
};

export default InputField;
