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
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import InputField from '../InputField';
import ConfirmationButtons from '../ConfirmationButtons';
import MethodEdit from './MethodEdit';
import MethodDisplay from './MethodDisplay';
import changeHandler from '../../utils/handleChange';

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
        setValues(defaultValues);
        saveContact();
    };

    const handleSave = () => {
        if (values.name === '' || values.businessName === '') return;
        // TODO warn user why failed, change fields to error
        // TODO send request to server to save, if success then propogate farther, add in responsive button
        setAdditionArea('');
        saveContact(values);
        setValues(defaultValues);
    };

    const handleSaveMethod = (method) => {
        setAdditionArea('');
        if (!method) return;
        let contactMethods = values.contactMethods;
        if (!method._id) method._id = contactMethods.length + 1;
        //check if save or update
        if (contactMethods.map((method) => method._id).includes(method._id)) {
            contactMethods = contactMethods.filter((existingMethod) => existingMethod._id !== method._id);
        }
        contactMethods.push(method);
        setValues({ ...values, contactMethods });
    };

    const handleEditMethod = (method) => {
        // Show edit, populate edit with the details of this one, remove this one from the existing values
        setAdditionArea(
            <MethodEdit
                saveMethod={handleSaveMethod}
                methodName={method.type}
                // methodLabel={{}}
                methodIcon={<AlternateEmailIcon />}
                {...method}
            />
        );
    };

    const handleRemoveMethod = (method) => {
        let contactMethods = values.contactMethods;
        contactMethods = contactMethods.filter(
            (existingMethod) => !(existingMethod.details === method.details && existingMethod.type === method.type)
        );
        setValues({ ...values, contactMethods });
    };

    const handleAddClick = (type) => {
        switch (type) {
            case 'email':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit saveMethod={handleSaveMethod} methodName="email" methodLabel="Email Address" />
                    );
                };
                break;
            case 'phone':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit saveMethod={handleSaveMethod} methodName="phone" methodLabel="Phone Number" />
                    );
                };
                break;
            case 'address':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit saveMethod={handleSaveMethod} methodName="address" methodLabel="Address" />
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
                    <List dense={true}>
                        {values.contactMethods.map((method, index) => (
                            <MethodDisplay
                                key={index}
                                handleRemove={handleRemoveMethod}
                                handleEdit={handleEditMethod}
                                {...method}
                            />
                        ))}
                    </List>
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