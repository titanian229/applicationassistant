import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, lighten } from '@material-ui/core/styles';
import {
    red,
    indigo,
    blue,
    lightBlue,
    teal,
    green,
    yellow,
    deepOrange,
    purple,
    deepPurple,
} from '@material-ui/core/colors/';
import {
    Typography,
    Box,
    Collapse,
    IconButton,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import AssetListItem from '../components/AssetListItem';
// import AddButton from '../components/AddButton';
// import ContactListItem from '../components/ContactListItem';
import ContactListSection from '../components/ContactListSection';

import { useGlobalStore } from '../components/GlobalStore';

const contactColumns = [
    { name: 'Name', id: 'name', align: 'right' },
    { name: 'Business', id: 'businessName', align: 'right' },
    // { name: 'Role', id: 'roleTitle', align: 'right' },
];

const useStyles = makeStyles((theme) => ({
    tableRoot: {},
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

const Contacts = (props) => {
    // SHOW search bar to search, all contacts sorted by either name or company
    // On click of contact bring to view page for that contact, that has edit button to change things.
    const [, , { API, loadResource }] = useGlobalStore();
    const [contacts, setContacts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getContacts()
    }, []);

    const getContacts = () => {
        loadResource(() => API.getContacts(), 'contacts', setContacts);
    }

    return (
        <Grid container direction="column">
            <Box padding={2}>
                {/* <List className={classes.listRoot}> */}
                {/* <ListItem>
                        <ListItemAvatar>
                            <
                        </ListItemAvatar>
                    </ListItem> */}
                {/* {contacts.map((contact, index) => (
                        <AssetListItem icon={contact.name[0]} primary={contact.name} 
                        avatarClassName={classes[colours[index % colours.length]]}
                        secondary={contact.businessName} />
                    ))} */}
                {/* </List>  */}
                <ContactListSection
                    contacts={contacts}
                    refreshContacts={getContacts}
                />
            </Box>
        </Grid>
    );
};

export default Contacts;
