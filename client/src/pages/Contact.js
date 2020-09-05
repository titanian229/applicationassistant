import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Backdrop,
    CircularProgress,
    // Typography,
    Grid,
    // Paper,
    // Box,
    // Divider,
    // Accordion,
    // AccordionDetails,
    // AccordionSummary,
    // Tabs,
    // Tab,
    // List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../components/GlobalStore';

import ContactView from '../components/ContactView';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Contact = () => {
    let { id } = useParams();
    const classes = useStyles();
    const [globalStore, , { API, loadResource }] = useGlobalStore();
    const [contact, setContact] = useState({
        name: '',
        roleTitle: '',
        businessName: '',
        contactMethods: [],
        notes: '',
        associatedTodos: [],
    });

    const fetchContact = (id) => {
        loadResource(async () => API.getContact(id), 'contact', setContact);
    };

    useEffect(() => {
        fetchContact(id)
        // eslint-disable-next-line
    }, [id])

    return (
        <Grid container direction="column">
            <ContactView contact={contact} />
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Contact;
