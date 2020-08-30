import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmationButtons from '../ConfirmationButtons';
import changeHandler from '../../utils/handleChange';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

const useContactStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    container: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 5,
    },
}));

const icons = {
    email: <AlternateEmailIcon />,
    phone: <PhoneOutlinedIcon />,
    address: <HomeOutlinedIcon />,
};

const verifyMethod = {
    email: (value) => true,
    phone: (value) => true,
    address: (value) => true,
};

const MethodEdit = (props) => {
    const { methodName, methodLabel, _id, details, phoneType, saveMethod } = props;
    const methodIcon = icons[methodName];
    const classes = useContactStyles();
    const defaultValues = {
        type: methodName,
        details: details || '',
        _id: _id || undefined,
    };
    // TODO REFACTOR to have several methods, remove phoneType, use methodName instead

    useEffect(() => {
        //This watches for the edit button being clicked to reset values
        console.log(details);
        setValues(defaultValues);
    }, [details]);

    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);

    const handleSave = () => {
        if (values.details === '') return;
        saveMethod(values);
        setValues(defaultValues);
    };

    const handleClose = () => {
        saveMethod();
        setValues(defaultValues);
    };

    return (
        <Grid container className={classes.container} direction="column">
            <TextField
                name="details"
                label={methodLabel || ''}
                className={classes.textField}
                onChange={handleChange('details')}
                value={values.details}
                type="text"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{methodIcon}</InputAdornment>,
                }}
            />
            {['cell', 'office', 'home'].includes(methodName) && (
                <FormControl variant="outlined">
                    <InputLabel id="phone-type-label">Phone</InputLabel>
                    <Select
                        labelId="phone-type-label"
                        id="phone-type"
                        value={values.type}
                        onChange={handleChange('type', 'select')}
                        label="Phone"
                    >
                        <MenuItem value="cell">Mobile</MenuItem>
                        <MenuItem value="office">Office</MenuItem>
                        <MenuItem value="home">Home</MenuItem>
                    </Select>
                </FormControl>
            )}
            <ConfirmationButtons {...{ handleSave, handleClose }} />
        </Grid>
    );
};

export default MethodEdit;
