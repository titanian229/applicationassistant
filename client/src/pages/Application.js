import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Typography, Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import StatusArray from '../components/StatusArray';

import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
import formatDate from '../utils/formatDate';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        position: 'relative',
        width: '100vw',
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(-1),
        padding: theme.spacing(1, 3),
    },
    header: {
        width: 340,
        // outline: '1px solid blue',
        zIndex: 2,
    },
    main: {
        position: 'relative',
        top: -40,
        paddingTop: 40,
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        // padding: theme.spacing(1),
        // outline: '1px solid red',
    },
}));

const Application = () => {
    let { id } = useParams();
    const [globalStore, dispatch, { processServerResponse, sendMessage }] = useGlobalStore();
    const [application, setApplication] = useState({
        businessName: '',
        roleTitle: '',
        requirementsNote: '',
        notes: '',
        postLink: '',
        dateFound: '',
        foundWhereNote: '',
        haveApplied: '',
        appliedDate: '',
        interviewsArray: [],
        haveResearched: '',
        haveResearchedNotes: '',
        resumes: [],
        contacts: [],
        todos: [],
        createdAt: '',
    });
    const {
        businessName,
        roleTitle,
        requirementsNote,
        notes,
        postLink,
        dateFound,
        foundWhereNote,
        haveApplied,
        appliedDate,
        interviewsArray,
        haveResearched,
        haveResearchedNotes,
        resumes,
        contacts,
        todos,
        createdAt,
    } = application;

    const classes = useStyles();

    const fetchApplication = async (id) => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.getApplication(id);
        processServerResponse(serverResponse);
        if (serverResponse.application) {
            setApplication(serverResponse.application);
        }
        dispatch({ do: 'setLoading', loading: false });
    };

    useEffect(() => {
        fetchApplication(id);
    }, [id]);

    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
            <Paper elevation={12} className={classes.header}>
                <Typography variant="h4" align="center">
                    {businessName}
                </Typography>
                <Typography variant="h6" align="center">
                    {roleTitle}
                </Typography>
            </Paper>
            <Paper elevation={4} className={classes.main}>
                <Box padding={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            {postLink && (
                                <a href={postLink} alt="Original Post">
                                    Original Post
                                </a>
                            )}
                            <StatusArray {...{ haveApplied, haveResearched, interviewsArray }} />
                            {requirementsNote && (<Typography variant='body1'>{requirementsNote}</Typography>)}
                        </Grid>
                        <Grid item xs={4}>
                            {(dateFound || foundWhereNote) && (
                                <Typography variant="subtitle1" align="right">
                                    Found
                                </Typography>
                            )}
                            <Typography variant="subtitle2" align="right">
                                {formatDate(dateFound)}
                            </Typography>
                            {foundWhereNote && (
                                <Typography variant="subtitle2" align="right">
                                    {foundWhereNote}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Application;
