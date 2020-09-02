import React, { useState } from 'react';
import { Grid, List } from '@material-ui/core';
import ContactNew from '../ContactNew';
import ContactChooser from '../ContactChooser';
import ContactListItem from '../ContactListItem';
import AddButton from '../AddButton';

const ContactListSection = (props) => {
    const { contacts, updateContacts } = props;
    const [contactsChooserOpen, setContactsChooserOpen] = useState(false);
    const [contactNewOpen, setContactNewOpen] = useState(false);

    const saveContact = (contact) => {
        setContactNewOpen(false);
        setContactsChooserOpen(false);
        if (!contact) return;
        if (contact === 'addContact') {
            setContactNewOpen(true);
            return;
        }

        let newContacts = contacts;
        if (!contact._id) contact._id = newContacts.length + 1;
        if (contacts.map((contact) => contact._id).includes(contact._id)) return;
        newContacts.push(contact);
        updateContacts(newContacts);
    };

    const removeContact = (contactID) => {
        let newContacts = contacts;
        newContacts = newContacts.filter((contact) => contact._id !== contactID);
        updateContacts(newContacts);
    };

    return (
        <Grid container direction="column">
            <List dense={true}>
                {contacts.map((contact) => (
                    <ContactListItem handleRemove={removeContact} {...contact} />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={() => setContactsChooserOpen(true)} />
            <ContactChooser open={contactsChooserOpen} onClose={saveContact} />
            <ContactNew open={contactNewOpen} saveContact={saveContact} />
        </Grid>
    );
};

export default ContactListSection;
