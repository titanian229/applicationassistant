import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    Dialog,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../InputField';

import changeHandler from '../../utils/handleChange';
// import API from '../../utils/API'
import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({}));

const ContactChooser = (props) => {
    const classes = useStyles();
    const { open, onClose } = props;
    const [contacts, setContacts] = useState([]);
    const [, , { loadResource, API }] = useGlobalStore();

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (open && contacts.length === 0) {
            console.log('Use effect called, no contacts present so dialog skipped to add contact')
            onClose('addContact');
        }
    }, [open]);

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const fetchContacts = async () => {
        loadResource(async () => API.getContacts(), 'contacts', setContacts, false);
        // const serverReturn = await API.getContacts();

        // if (!serverReturn) {
        //     console.log('error fetching contacts');
        //     return;
        // }
        // if (serverReturn.error || !serverReturn.contacts) {
        //     console.log('error fetching contacts');
        //     return;
        // }

        // setContacts(serverReturn.contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="contact selection" open={open}>
            <DialogTitle id="contact selection">Saved Contacts</DialogTitle>
            <List>
                {contacts.map((contact, index) => (
                    <ListItem button onClick={() => handleListItemClick(contact)} key={contact._id || index}>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={contact.name} secondary={contact.businessName} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addContact')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add Contact" />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default ContactChooser;
