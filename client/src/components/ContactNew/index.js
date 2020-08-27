import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import InputField from '../InputField';
import ConfirmationButtons from '../ConfirmationButtons';
import changeHandler from '../../utils/handleChange';

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

const MethodEdit = (props) => {
    const { methodName, methodLabel, methodIcon, details, saveMethod } = props;
    const classes = useContactStyles();
    const defaultValues = {
        type: methodName,
        details: details || '',
    };
    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);

    const handleSave = () => {
        if (values.details === '') return;
        saveMethod(values);
    };

    const handleClose = () => {
        saveMethod();
    };

    return (
        <Grid container className={classes.container} direction="column">
            <TextField
                name="details"
                label={methodLabel}
                className={classes.textField}
                onChange={handleChange('details')}
                value={values.details}
                type="text"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{methodIcon}</InputAdornment>,
                }}
            />
            <ConfirmationButtons {...{ handleSave, handleClose }} />
        </Grid>
    );
};

const ContactNew = (props) => {
    const { businessName, open, saveContact } = props;
    const defaultValues = {
        name: '',
        roleTitle: '',
        businessName: businessName || '',
        contactMethods: [],
        notes: '',
    };
    const [values, setValues] = useState(defaultValues);
    const [additionArea, setAdditionArea] = useState('');

    const handleChange = changeHandler(values, setValues);

    const handleClose = () => {
        setAdditionArea('');
        saveContact();
    };

    const handleSave = () => {
        if (values.name === '' || values.businessName === '') return;
        // TODO warn user why failed, change fields to error
        // TODO send request to server to save, if success then propogate farther, add in responsive button
        saveContact(values);
        setValues(defaultValues);
    };

    const handleSaveMethod = (method) => {
        setAdditionArea('');
        if (!method) return;
        let contactMethods = values.contactMethods;
        contactMethods.push(method);
        setValues({ ...values, contactMethods });
    };

    const handleAddClick = (type) => {
        switch (type) {
            case 'email':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit
                            saveMethod={handleSaveMethod}
                            methodName="email"
                            methodLabel="Email Address"
                            methodIcon={<AlternateEmailIcon />}
                        />
                    );
                };
                break;
            case 'phone':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit
                            saveMethod={handleSaveMethod}
                            methodName="email"
                            methodLabel="Email Address"
                            methodIcon={<AlternateEmailIcon />}
                        />
                    );
                };
                break;
            case 'address':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit
                            saveMethod={handleSaveMethod}
                            methodName="email"
                            methodLabel="Email Address"
                            methodIcon={<AlternateEmailIcon />}
                        />
                    );
                };
                break;

            default:
                break;
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="contact-dialog">
            <DialogTitle id="contact-dialog">New Contact</DialogTitle>
            <DialogContent>
                <DialogContentText>Add a contact to link to this application</DialogContentText>
                {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
                <Grid container direction="column">
                    <InputField name="name" label="Name" {...{ values, handleChange }} />
                    <InputField name="businessName" label="Company" {...{ values, handleChange }} />
                    <InputField name="roleTitle" label="Role" {...{ values, handleChange }} />
                    {/* List of existing, with ability to edit/delete them */}
                    {/* three icon buttons to add new ones of each type  */}
                    {additionArea}

                    <Grid container justify="space-evenly">
                        <IconButton onClick={handleAddClick('email')}>
                            <AlternateEmailIcon />
                        </IconButton>
                        <IconButton onClick={handleAddClick('phone')}>
                            <PhoneOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={handleAddClick('address')}>
                            <HomeOutlinedIcon />
                        </IconButton>
                    </Grid>

                    <InputField name="notes" label="Notes" {...{ values, handleChange }} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactNew;
