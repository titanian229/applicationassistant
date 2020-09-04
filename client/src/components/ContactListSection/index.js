import React, { useState, useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, indigo, blue, lightBlue, teal, green, yellow, deepOrange, deepPurple } from '@material-ui/core/colors/';
import ContactNew from '../ContactNew';
import ContactChooser from '../ContactChooser';
import ContactListItem from '../ContactListItem';
import ContactViewDialog from '../ContactViewDialog';
import AddButton from '../AddButton';
import { useGlobalStore } from '../GlobalStore';

const useAvatarStyles = makeStyles((theme) => ({
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    indigo: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    lightBlue: {
        color: theme.palette.getContrastText(lightBlue[500]),
        backgroundColor: lightBlue[500],
    },
    teal: {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    yellow: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    },
    deepOrange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const colours = ['red', 'indigo', 'blue', 'lightBlue', 'teal', 'green', 'yellow', 'deepOrange', 'purple'];

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
    const [contactViewOpen, setContactViewOpen] = useState(false);
    const [viewContactItem, setViewContactItem] = useState({});
    const [editContactItem, setEditContactItem] = useState({});
    const [, dispatch, { processServerResponse, API, confirmAction }] = useGlobalStore();
    const avatarClasses = useAvatarStyles();

    useEffect(() => {
        console.log('Contacts have changed');
    }, [contacts]);

    useEffect(() => {
        if (contactNewOpen === false) {
            console.log('ContactNewOpen has changed', contactNewOpen);
            setEditContactItem({});
        }
    }, [contactNewOpen]);

    useEffect(() => {
        if (contactViewOpen === false) {
            console.log('contactViewOpen has changed', contactViewOpen);
            setViewContactItem({});
        }
    }, [contactViewOpen]);

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
        // setContactNewOpen(true);  Disabled while changing to show first
        setContactViewOpen(true);
    };

    const editContact = (contact) => {
        setEditContactItem(contact);
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

    const handleDelete = (contact) => {
        console.log("handle delete clicked", contact)
        //() => deleteContact(contact._id)
    };

    const handleAdd = () => {
        if (applicationParent) {
            setContactsChooserOpen(true);
            return;
        }
        saveContact('addContact');
    };

    return (
        <Grid container direction="column">
            <List dense={true}>
                {contacts.map((contact, index) => (
                    <ContactListItem
                        key={contact._id}
                        handleRemove={applicationParent ? handleDissociateContact : ''}
                        viewContact={viewContact}
                        contact={contact}
                        avatarClassName={avatarClasses[colours[index % colours.length]]}
                    />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={handleAdd} />
            <ContactChooser open={contactsChooserOpen} onClose={saveContact} />
            <ContactNew
                open={contactNewOpen}
                saveContact={saveContact}
                existingContact={editContactItem}
                deleteContact={deleteContact}
            />
            <ContactViewDialog
                open={contactViewOpen}
                onClose={() => setContactViewOpen(false)}
                contact={viewContactItem}
                deleteContact={deleteContact}
                handleEdit={editContact}
                handleDissociate={applicationParent ? handleDissociateContact : null}
            />
        </Grid>
    );
};

export default ContactListSection;
