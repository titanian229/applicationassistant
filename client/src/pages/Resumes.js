import React, { useState, useEffect } from 'react';

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
import { makeStyles } from '@material-ui/core/styles';
// import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';

import ResumeListSection from '../components/ResumeListSection';

import { useGlobalStore } from '../components/GlobalStore';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Resumes = () => {
    // SHOW search bar to search, all resumes sorted
    // On click of resume bring to view page for that resume, that has edit button to change things.
    const [globalStore, , { API, loadResource }] = useGlobalStore();
    const [resumes, setResumes] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getResumes();
        // eslint-disable-next-line
    }, []);

    const getResumes = () => {
        loadResource(() => API.getResumes(), 'resumes', setResumes);
    };

    return (
        <Grid container direction="column">
            <Typography variant='h4' align='center'>Resumes</Typography>
            <Box padding={2}>
                <ResumeListSection resumes={resumes} refreshResumes={getResumes} />
            </Box>
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Resumes;
