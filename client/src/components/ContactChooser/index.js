import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import { useGlobalStore } from '../GlobalStore';


const ContactChooser = (props) => {
    const { open, onClose } = props;
    const [contacts, setContacts] = useState([]);
    const [, , { loadResource, API }] = useGlobalStore();

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (open && contacts.length === 0) {
            console.log('Use effect called, no contacts present so dialog skipped to add contact');
            onClose('addContact');
        }
        // eslint-disable-next-line
    }, [open]);

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const fetchContacts = async () => {
        loadResource(async () => API.getContacts(), 'contacts', setContacts, false);
    };

    useEffect(() => {
        if (open === true) {
            fetchContacts();
        }
        // eslint-disable-next-line
    }, [open]);

    useEffect(() => {
        fetchContacts();
        // eslint-disable-next-line
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
