import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, lighten } from '@material-ui/core/styles';
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
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import AssetListItem from '../components/AssetListItem';
// import AddButton from '../components/AddButton';
// import ContactListItem from '../components/ContactListItem';
import ContactListSection from '../components/ContactListSection';

import { useGlobalStore } from '../components/GlobalStore';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Contacts = (props) => {
    // SHOW search bar to search, all contacts sorted by either name or company
    // On click of contact bring to view page for that contact, that has edit button to change things.
    const [globalStore, , { API, loadResource }] = useGlobalStore();
    const [contacts, setContacts] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        loadResource(() => API.getContacts(), 'contacts', setContacts);
    };

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
                <ContactListSection contacts={contacts} refreshContacts={getContacts} />
            </Box>
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Contacts;
