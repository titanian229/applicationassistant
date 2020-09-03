import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
    Backdrop,
    CircularProgress,
    Typography,
    Grid,
    Paper,
    Box,
    Divider,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Tabs,
    Tab,
    List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import WorkIcon from '@material-ui/icons/WorkTwoTone';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import StatusArray from '../components/StatusArray';
import TabItem from '../components/TabItem';
import ResumeListItem from '../components/ResumeListItem';
import TodoListItemToggle from '../components/TodoListItemToggle';
import ContactListItem from '../components/ContactListItem';
import AddButton from '../components/AddButton';
import TodoNew from '../components/TodoNew';
import ResumeChooser from '../components/ResumeChooser';
import ContactChooser from '../components/ContactChooser';
import ContactNew from '../components/ContactNew';
import ResumeNew from '../components/ResumeNew';

import ContactListSection from '../components/ContactListSection';
import ResumeListSection from '../components/ResumeListSection';

// import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
// import formatDate from '../utils/formatDate';

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
    section: {
        marginTop: theme.spacing(1),
    },
    central: {
        padding: theme.spacing(0, 2),
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
        marginTop: theme.spacing(4),
    },
}));

const Application = () => {
    let { id } = useParams();
    const [globalStore, dispatch, { processServerResponse, API, formatDate, loadResource }] = useGlobalStore();

    const [currentTab, setCurrentTab] = useState(0);
    const [todoNewOpen, setTodoNewOpen] = useState(false);
    const [resumeNewOpen, setResumeNewOpen] = useState(false);
    const [contactNewOpen, setContactNewOpen] = useState(false);
    const [viewTodoItem, setViewTodoItem] = useState({});

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
    const handleTabChange = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const fetchApplication = async (id) => {
        // dispatch({ do: 'setLoading', loading: true });
        // const serverResponse = await API.getApplication(id);
        // const serverUp = processServerResponse(serverResponse);
        // dispatch({ do: 'setLoading', loading: false });
        // if (serverUp === false) return;
        // if (serverResponse.application) {
        //     setApplication(serverResponse.application);
        // }
        loadResource(async () => API.getApplication(id), 'application', setApplication);
    };

    useEffect(() => {
        fetchApplication(id);
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

    const removeTodo = async (todoID) => {
        setTodoNewOpen(false);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteTodo(todoID, id);
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

    // CONTACTS

    const updateContacts = async (contacts) => {
        console.log('updating contacts', contacts);
        // Contact has already been created, must add to this application and associate
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.updateApplication(id, { contacts });
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.application) {
            console.log('server returned contacts', serverResponse);
            setApplication({ ...application, contacts: serverResponse.application.contacts });
        }
    };

    // const viewContact = (contact) => {
    //     console.log('view contact', contact)
    // }

    const updateResumes = async (resumes) => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.updateApplication(id, { resumes });
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.application) {
            setApplication({ ...application, resumes: serverResponse.application.resumes });
        }
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
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
                        <Grid item xs={8}>
                            <Box className={classes.section}>
                                <StatusArray {...{ haveApplied, haveResearched, interviewsArray }} />
                            </Box>
                            {requirementsNote && (
                                <Box className={classes.section}>
                                    <Typography variant="subtitle2">Requirements:</Typography>
                                    <Typography variant="body2">{requirementsNote}</Typography>
                                </Box>
                            )}
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
                            {postLink && (
                                <Typography variant="subtitle2" align="right">
                                    <a href={postLink} alt="Original Post">
                                        Original Post
                                    </a>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
                    <Box className={classes.central}>
                        {notes && (
                            <Box className={classes.section}>
                                <Typography variant="subtitle2">Notes:</Typography>
                                <Typography variant="body2">{notes}</Typography>
                            </Box>
                        )}
                        {appliedDate && <Typography variant="body2">Applied: {formatDate(appliedDate)}</Typography>}
                        {/* TABS */}
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
                                        <TodoListItemToggle viewTodo={viewTodo} {...todo} />
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
                                {/* <List>
                                    {contacts.map((contact) => (
                                        <ContactListItem {...contact} />
                                    ))}
                                </List> */}
                                <ContactListSection
                                    applicationID={id}
                                    contacts={contacts}
                                    updateContacts={updateContacts}
                                />
                            </TabItem>
                            <TabItem tab={2} {...{ currentTab }}>
                                <ResumeListSection applicationID={id} resumes={resumes} updateResumes={updateResumes} />

                                {/* <List>
                                    {resumes.map((resume) => (
                                        <ResumeListItem {...resume} />
                                    ))}
                                </List> */}
                                {/* <AddButton onClick={() => setResumesChooserOpen(true)} /> */}
                                {/* <ResumeChooser open={resumesChooserOpen} onClose={setSelectedResume} /> */}
                                {/* <ResumeNew open={resumeNewOpen} saveResume={saveResume} /> */}
                            </TabItem>
                        </Paper>
                        {/* <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="resume-content"
                                id="resume-header"
                            >
                                <Typography className={classes.heading}>Resume</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion> */}
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
