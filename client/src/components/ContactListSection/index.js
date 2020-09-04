import React, { useState, useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import ContactNew from '../ContactNew';
import ContactChooser from '../ContactChooser';
import ContactListItem from '../ContactListItem';
import AddButton from '../AddButton';
import { useGlobalStore } from '../GlobalStore';

const ContactListSection = (props) => {
    // TODO Refactor this so it's independent of the application, but optionally calls function
    // to update the application to reassociate.  The only dependent function is the dissociate
    // which will optionally render the delete icon and dissociate using a parent function passed in
    // TO be independent two states, either a child of an application or independent
    // Either way, pass in the list of contacts.
    // Dissociate only shows if it's an application
    // Create, edit, delete always show.
    // Save new contact needs to optionally associate if application present
    const { contacts, refreshContacts, applicationParent } = props;
    const [contactsChooserOpen, setContactsChooserOpen] = useState(false);
    const [contactNewOpen, setContactNewOpen] = useState(false);
    const [viewContactItem, setViewContactItem] = useState({});
    const [, dispatch, { processServerResponse, API }] = useGlobalStore();

    useEffect(() => {
        console.log('Contacts have changed');
    }, [contacts]);

    const saveContact = (contact) => {
        setContactNewOpen(false);
        setContactsChooserOpen(false);
        setViewContactItem({});
        if (!contact) return;
        if (contact === 'addContact') {
            setContactNewOpen(true);
            return;
        }

        if (applicationParent) {
            applicationParent.associateContact(contact);
        }
        refreshContacts();

        // let newContacts = contacts;
        // if (!contact._id) contact._id = newContacts.length + 1;

        // newContacts = newContacts.filter((existingContact) => existingContact._id !== contact._id);
        // // if (contacts.map((contact) => contact._id).includes(contact._id)) return;
        // newContacts.push(contact);
        // updateContacts(newContacts);
    };

    // const removeContact = (contactID) => {
    //     if (applicationParent){
    //         dissociateContact(contactID)
    //     }
    //     // let newContacts = contacts;
    //     // newContacts = newContacts.filter((contact) => contact._id !== contactID);
    //     // updateContacts(newContacts);
    // };

    const viewContact = (contact) => {
        setViewContactItem(contact);
        setContactNewOpen(true);
    };

    const handleDissociateContact = (contact) => {
        if (applicationParent) {
            applicationParent.dissociateContact(contact);
            refreshContacts();
        }
    };

    const deleteContact = async (contactID) => {
        setContactNewOpen(false);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteContact(contactID);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp == false) return;
        refreshContacts();
    };

    const handleAdd = () => {
        if (applicationParent){
            setContactsChooserOpen(true)
            return
        }
        saveContact('addContact')
    }

    return (
        <Grid container direction="column">
            <List dense={true}>
                {contacts.map((contact) => (
                    <ContactListItem
                        key={contact._id}
                        handleRemove={applicationParent ? handleDissociateContact : ''}
                        viewContact={viewContact}
                        contact={contact}
                    />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={handleAdd} />
            <ContactChooser open={contactsChooserOpen} onClose={saveContact} />
            <ContactNew
                open={contactNewOpen}
                saveContact={saveContact}
                existingContact={viewContactItem}
                deleteContact={deleteContact}
            />
        </Grid>
    );
};

export default ContactListSection;
