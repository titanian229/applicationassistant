import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Box,
    // Collapse,
    // IconButton,
    // Paper,
    Grid,
    // List,
    // ListItem,
    // ListItemText,
    // Divider,
    // Avatar,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';

// import AddButton from '../components/AddButton';
// import ContactListItem from '../components/ContactListItem';
import ContactListSection from '../components/ContactListSection';
import SectionTitle from '../components/SectionTitle';
import FilterAndSearch from '../components/FilterAndSearch';

import { useGlobalStore } from '../components/GlobalStore';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    title: {
        marginBottom: theme.spacing(4),
    },
}));

const Contacts = () => {
    // SHOW search bar to search, all contacts sorted by either name or company
    // On click of contact bring to view page for that contact, that has edit button to change things.
    const [globalStore, , { API, loadResource }] = useGlobalStore();
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    const getContacts = () => {
        loadResource(() => API.getContacts(), 'contacts', setContacts);
    };

    return (
        <Grid container direction="column">
            <SectionTitle title="Contacts" />

            <Box padding={2}>
                <FilterAndSearch
                    assets={contacts}
                    setAssets={setFilteredContacts}
                    // sortOptions={sortOptions}
                    // sortOptionChoice={extractIndex(sortMethod.key)}
                    // sortSetter={sortMethodSetter}
                />
                <ContactListSection contacts={filteredContacts !== null ? filteredContacts : contacts} refreshContacts={getContacts} />
            </Box>
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Contacts;
