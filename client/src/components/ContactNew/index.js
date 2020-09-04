import React, { useState, useEffect } from 'react';
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

// import changeHandler from '../../utils/handleChange';
// import API from '../../utils/API';
import { useGlobalStore } from '../GlobalStore';

const ContactNew = (props) => {
    const { businessName, open, saveContact, existingContact, deleteContact } = props;
    const defaultValues = {
        name: '',
        roleTitle: '',
        businessName: businessName || '',
        contactMethods: [],
        notes: '',
    };
    const [values, setValues] = useState(defaultValues);
    const [additionArea, setAdditionArea] = useState('');
    const [, dispatch, { processServerResponse, sendMessage, API, changeHandler }] = useGlobalStore();

    const handleChange = changeHandler(values, setValues);

    useEffect(() => {
        if (!existingContact) return;
        if (existingContact._id) {
            console.log('contact changed');
            setValues({ ...defaultValues, ...existingContact });
        }
    }, [existingContact]);

    // TODO try a useffect that watches for changes in open, and if there is an 
    // existing contact being showed

    const handleClose = () => {
        setAdditionArea('');
        setValues(defaultValues);
        saveContact();
    };

    const handleSave = async () => {
        const contact = JSON.parse(JSON.stringify(values));
        if (contact.name === '' || contact.businessName === '') {
            sendMessage('Contact requires a name and business', { variant: 'error', key: 'missingbizandname' });
            return;
        }
        dispatch({ do: 'setLoading', loading: true });

        // removing the IDs so they're replaced in the DB
        contact.contactMethods = contact.contactMethods.map((method) => {
            delete method._id;
            return method;
        });

        const serverResponse = !existingContact._id
            ? await API.post('/api/contacts', contact)
            : await API.updateContact(existingContact._id, contact);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.contact) {
            setAdditionArea('');
            saveContact(serverResponse.contact);
            setValues(defaultValues);
        }
    };

    const handleDelete = () => {
        deleteContact(values._id)
        setValues(defaultValues)
    }

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
            case 'cell':
                return (event) => {
                    setAdditionArea(
                        <MethodEdit saveMethod={handleSaveMethod} methodName="cell" methodLabel="Phone Number" />
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
                        <IconButton onClick={handleAddClick('cell')}>
                            <PhoneOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={handleAddClick('address')}>
                            <HomeOutlinedIcon />
                        </IconButton>
                    </Grid>

                    <InputField multiline name="notes" label="Notes" {...{ values, handleChange }} />
                </Grid>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button> */}
                <ConfirmationButtons
                    handleDelete={!existingContact._id ? '' : handleDelete}
                    {...{ handleClose, handleSave }}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ContactNew;
