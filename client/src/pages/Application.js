import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Backdrop, CircularProgress, Typography, Grid, Paper, Box, Divider, Tabs, Tab, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey,
} from '@material-ui/core/colors/';

import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';

import StatusArray from '../components/StatusArray';
import TabItem from '../components/TabItem';
import TodoListItemToggle from '../components/TodoListItemToggle';
import AddButton from '../components/AddButton';
import TodoNew from '../components/TodoNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ContactListSection from '../components/ContactListSection';
import ResumeListSection from '../components/ResumeListSection';
import InterviewListSection from '../components/InterviewListSection';
import OfferSection from '../components/OfferSection';

import ColourChooser from '../components/ColourChooser';
import AssetActionsPanel from '../components/AssetActionsPanel';

import { Accordion, AccordionSummary, AccordionDetails } from '../components/Accordion';

import { useGlobalStore } from '../components/GlobalStore';

const colourShade = 300;

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        position: 'relative',
        // width: '100vw',
        height: '100%',
        // backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(-1),
        padding: theme.spacing(1, 3),
    },
    colouredBG: {
        // zIndex: 0,
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // backgroundColor: 'red'
    },

    header: {
        width: 340,
        // outline: '1px solid blue',
        zIndex: 2,
    },
    main: {
        position: 'relative',
        top: -40,
        paddingTop: 50,
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        // padding: theme.spacing(1),
        // outline: '1px solid red',
    },
    section: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    central: {
        // padding: theme.spacing(0, 2),
    },
    title: {
        color: theme.palette.primary.dark,
    },
    subtitle: {
        color: theme.palette.secondary.dark,
    },
    tabRoot: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
    tabIndicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
    CRTcontainer: {
        // marginTop: theme.spacing(4),
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: theme.spacing(3),
    },
    none: {
        backgroundColor: theme.palette.secondary.light,
    },
    red: {
        backgroundColor: red[colourShade],
    },
    pink: {
        backgroundColor: pink[colourShade],
    },
    purple: {
        backgroundColor: purple[colourShade],
    },
    deepPurple: {
        backgroundColor: deepPurple[colourShade],
    },
    indigo: {
        backgroundColor: indigo[colourShade],
    },
    blue: {
        backgroundColor: blue[colourShade],
    },
    lightBlue: {
        backgroundColor: lightBlue[colourShade],
    },
    cyan: {
        backgroundColor: cyan[colourShade],
    },
    teal: {
        backgroundColor: teal[colourShade],
    },
    green: {
        backgroundColor: green[colourShade],
    },
    lightGreen: {
        backgroundColor: lightGreen[colourShade],
    },
    lime: {
        backgroundColor: lime[colourShade],
    },
    yellow: {
        backgroundColor: yellow[colourShade],
    },
    amber: {
        backgroundColor: amber[colourShade],
    },
    orange: {
        backgroundColor: orange[colourShade],
    },
    deepOrange: {
        backgroundColor: deepOrange[colourShade],
    },
    brown: {
        backgroundColor: brown[colourShade],
    },
    grey: {
        backgroundColor: grey[colourShade],
    },
    blueGrey: {
        backgroundColor: blueGrey[colourShade],
    },
}));

const Application = () => {
    let { id } = useParams();
    const [
        globalStore,
        dispatch,
        { processServerResponse, API, formatDate, loadResource, confirmAction },
    ] = useGlobalStore();
    const history = useHistory();

    const [currentTab, setCurrentTab] = useState(0);
    const [todoNewOpen, setTodoNewOpen] = useState(false);
    const [viewTodoItem, setViewTodoItem] = useState({});

    const [application, setApplication] = useState({
        businessName: '',
        roleTitle: '',
        location: '',
        colour: 'none',
        offers: [],
        companyInfo: '',
        description: '',
        requirementsNote: '',
        postLink: '',
        dateFound: null,
        foundWhereNote: '',
        haveApplied: false,
        appliedDate: null,
        interviewsArray: [],
        haveResearched: false,
        haveResearchedNotes: '',
        resumes: [],
        contacts: [],
        todos: [],
        notes: '',
        createdAt: '',
    });
    const {
        businessName,
        roleTitle,
        location,
        colour,
        offers,
        companyInfo,
        description,
        requirementsNote,
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
        notes,
        // createdAt,
    } = application;

    const classes = useStyles();
    const handleTabChange = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const fetchApplication = async (id) => {
        loadResource(async () => API.getApplication(id), 'application', setApplication);
    };

    useEffect(() => {
        fetchApplication(id);
        // eslint-disable-next-line
    }, [id]);

    const saveTodo = async (todo) => {
        setTodoNewOpen(false);
        if (!todo) return;

        dispatch({ do: 'setLoading', loading: true });
        if (!Number.isInteger(todo._id)) {
            console.log('update', todo);
            // This is an update, not a new todo
            const serverResponse = await API.updateTodo(todo);
            const serverUp = processServerResponse(serverResponse);
            dispatch({ do: 'setLoading', loading: false });
            if (serverUp === false) return;
            if (serverResponse.todo) {
                let appTodos = application.todos.filter((existingTodo) => existingTodo._id !== todo._id);
                appTodos.push(serverResponse.todo);
                setApplication({ ...application, todos: appTodos });
            }
            return;
        }
        console.log('new todo', todo);
        const serverResponse = await API.addTodo(todo, id);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.todo) {
            let appTodos = application.todos;
            appTodos.push(serverResponse.todo);
            setApplication({ ...application, todos: appTodos });
        }
    };

    const removeTodo = async (todo) => {
        setTodoNewOpen(false);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteTodo(todo._id, id);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.todos) {
            setApplication({ ...application, todos: serverResponse.todos });
        }
    };

    const viewTodo = (todo) => {
        setViewTodoItem(todo);
        setTodoNewOpen(true);
    };

    // const getContacts = async () => {
    //     console.log('Refreshing contacts');
    //     // get contacts, update.  Inside the actual thing use on delete, or everywhere to simplify
    //     loadResource(async () => API.getApplicationContacts(id), 'contacts', setContacts);
    // };

    const setItems = (itemType) => (items) => {
        setApplication({ ...application, [itemType]: items });
    };

    const refreshItems = (itemType) => async () => {
        console.log('Refreshing ', itemType);
        // get contacts, update.  Inside the actual thing use on delete, or everywhere to simplify
        loadResource(async () => API.getApplicationItems(id, itemType), itemType, setItems(itemType));
    };

    const changeItemAssociations = (action, itemType) => async (item) => {
        const serverResponse = await API.associateItem(id, item._id, action, itemType);
        processServerResponse(serverResponse);
    };

    // const updateResumes = async (resumes) => {
    //     dispatch({ do: 'setLoading', loading: true });
    //     const serverResponse = await API.updateApplication(id, { resumes });
    //     const serverUp = processServerResponse(serverResponse);
    //     dispatch({ do: 'setLoading', loading: false });
    //     if (serverUp === false) return;
    //     if (serverResponse.application) {
    //         setApplication({ ...application, resumes: serverResponse.application.resumes });
    //     }
    // };

    const handleEditApplication = () => {
        console.log('application edit clicked');
        history.push('/editapplication/' + id);
    };

    const handleDeleteApplication = async () => {
        console.log('application delete clicked');
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteApplication(id);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.success) {
            setTimeout(() => {
                console.log('SUCCESS MOVING TO APPLICATIONS');
                history.push('/applications');
            }, 2000);
        }
    };

    // OFFERS SECTION
    const addOffer = async (offer) => {
        console.log('adding offer', Boolean(offer._id), offer);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = offer._id
            ? await API.updateItem(id, offer, 'offers')
            : await API.associateItem(id, offer, 'push', 'offers');
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.application) {
            setItems('offers')(serverResponse.application.offers);
        }
        if (serverResponse.offers) {
            setItems('offers')(serverResponse.offers);
        }
    };

    const removeOffer = async (offer) => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.removeItem(id, offer._id, 'offers');
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;
        if (serverResponse.offers) {
            setItems('offers')(serverResponse.offers);
        }
    };

    const updateOffer = async (offer) => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.updateItem(id, offer, 'offers');
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.offers) {
            setItems('offers')(serverResponse.offers);
        }
    };

    const setColour = async (colour) => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.updateApplication(id, { colour });
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.application) {
            setApplication(serverResponse.application);
        }
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            // className={clsx(classes.container, classes[colour])}
            className={clsx(classes.container)}
        >
            <div className={clsx(classes.colouredBG, classes[colour])}></div>
            <Paper elevation={12} className={classes.header}>
                <Typography variant="h4" align="center" className={classes.title}>
                    {businessName}
                </Typography>
                <Typography variant="h6" align="center" className={classes.subtitle}>
                    {roleTitle}
                </Typography>
            </Paper>
            <Paper elevation={4} className={classes.main}>
                <Box padding={2}>
                    <Grid container spacing={3}>
                        <AssetActionsPanel
                            handleEdit={handleEditApplication}
                            handleDelete={confirmAction(handleDeleteApplication, {
                                text: 'Permanently delete application?',
                                confirmText: 'Delete',
                            })}
                            sideComponent={<ColourChooser colour={colour} setColour={setColour} />}
                        />

                        <Grid item xs={8}>
                            <Box className={classes.section}>
                                <StatusArray {...{ haveApplied, haveResearched, interviewsArray }} />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            {(dateFound || foundWhereNote) && (
                                <Typography variant="subtitle1" align="right">
                                    Found
                                </Typography>
                            )}
                            {dateFound && (
                                <Typography variant="subtitle2" align="right">
                                    {formatDate(dateFound)}
                                </Typography>
                            )}
                            {foundWhereNote && (
                                <Typography variant="subtitle2" align="right">
                                    {foundWhereNote}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Box className={classes.central}>
                        <Accordion className={classes.marginBottom}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="job-details-content"
                                id="job-details-header"
                            >
                                <Typography variant="h6">Job and Company Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container direction="column" justify="center">
                                    {description && (
                                        <Box className={classes.section}>
                                            <Typography variant="subtitle2">Job Description:</Typography>
                                            <Typography variant="body2">{description}</Typography>
                                        </Box>
                                    )}
                                    {requirementsNote && (
                                        <Box className={classes.section}>
                                            <Typography variant="subtitle2">Requirements:</Typography>
                                            <Typography variant="body2">{requirementsNote}</Typography>
                                        </Box>
                                    )}
                                    {postLink && (
                                        <Typography variant="subtitle2">
                                            <a href={postLink} alt="Original Post">
                                                Original Post
                                            </a>
                                        </Typography>
                                    )}
                                    {location && (
                                        <Box className={classes.section}>
                                            <Typography variant="subtitle2">Location:</Typography>
                                            <Typography variant="body2">{location}</Typography>
                                        </Box>
                                    )}
                                    {companyInfo && (
                                        <Box className={classes.section}>
                                            <Typography variant="subtitle2">Company Information:</Typography>
                                            <Typography variant="body2">{companyInfo}</Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        {notes && (
                            <Box className={classes.section}>
                                <Typography variant="subtitle2">Notes:</Typography>
                                <Typography variant="body2">{notes}</Typography>
                            </Box>
                        )}
                        {/* TODO add in section to edit notes, send for update */}
                        {haveResearchedNotes && (
                            <Box className={classes.section}>
                                <Typography variant="subtitle2">Research:</Typography>
                                <Typography variant="body2">{haveResearchedNotes}</Typography>
                            </Box>
                        )}
                        {appliedDate && <Typography variant="body2">Applied: {formatDate(appliedDate)}</Typography>}
                        {/* TABS */}
                        <Divider className={classes.divider} />
                        <Paper elevation={0} className={classes.CRTcontainer}>
                            <Tabs
                                centered
                                value={currentTab}
                                onChange={handleTabChange}
                                classes={{ indicator: classes.tabIndicator }}
                                aria-label="tabs for resumes todos contacts"
                                TabIndicatorProps={{ children: <span /> }}
                            >
                                <Tab disableRipple label="Todos" icon={<AddAlertIcon />} />
                                {/* TODO add checkboxes to show todo done or not */}
                                <Tab disableRipple label="Contacts" icon={<ContactsIcon />} />
                                <Tab disableRipple label="Resumes" icon={<DescriptionIcon />} />
                            </Tabs>

                            <TabItem tab={0} {...{ currentTab }}>
                                <List dense>
                                    {todos.map((todo) => (
                                        <TodoListItemToggle key={todo._id} viewTodo={viewTodo} {...todo} />
                                    ))}
                                </List>
                                <AddButton onClick={() => setTodoNewOpen(true)} />
                                <TodoNew
                                    open={todoNewOpen}
                                    todo={viewTodoItem}
                                    saveTodo={saveTodo}
                                    todoCount={todos.length}
                                    removeTodo={removeTodo}
                                />
                            </TabItem>
                            <TabItem tab={1} {...{ currentTab }}>
                                <ContactListSection
                                    contacts={contacts}
                                    refreshContacts={refreshItems('contacts')}
                                    applicationParent={{
                                        associateContact: changeItemAssociations('addToSet', 'contacts'),
                                        dissociateContact: changeItemAssociations('pull', 'contacts'),
                                    }}
                                />
                            </TabItem>
                            <TabItem tab={2} {...{ currentTab }}>
                                <ResumeListSection
                                    resumes={resumes}
                                    refreshResumes={refreshItems('resumes')}
                                    applicationParent={{
                                        associateResume: changeItemAssociations('addToSet', 'resumes'),
                                        dissociateResume: changeItemAssociations('pull', 'resumes'),
                                    }}
                                />
                            </TabItem>
                        </Paper>
                        <Divider className={classes.divider} />
                        <InterviewListSection
                            interviewsArray={interviewsArray}
                            refreshInterviews={refreshItems('interviewsArray')}
                            applicationID={id}
                        />
                        <Divider className={classes.divider} />
                        <OfferSection
                            offers={offers}
                            addOffer={addOffer}
                            removeOffer={removeOffer}
                            updateOffer={updateOffer}
                        />
                    </Box>
                </Box>
            </Paper>
            <Backdrop className={classes.backdrop} open={globalStore.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};

export default Application;
