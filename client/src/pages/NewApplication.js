import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Paper,
    Grid,
    Box,
    Container,
    Select,
    Input,
    InputLabel,
    Checkbox,
    MenuItem,
    FormControl,
    List,
    ListItem,
    ListItemText,
    FormGroup,
    FormControlLabel,
    Switch,
    Divider,
    Tab,
    Tabs,
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails,
    Badge,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../components/InputField';
import InterviewInformation from '../components/InterviewInformation';
import InterviewAddition from '../components/InterviewAddition';
import ContactChooser from '../components/ContactChooser';
import ContactListItem from '../components/ContactListItem';
import ResumeChooser from '../components/ResumeChooser';
import ResumeListItem from '../components/ResumeListItem';
import TodoListItem from '../components/TodoListItem';
import TodoNew from '../components/TodoNew';
import ContactNew from '../components/ContactNew';
import ResumeNew from '../components/ResumeNew';
import ResponsiveSave from '../components/ResponsiveSave';

import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import WorkIcon from '@material-ui/icons/WorkTwoTone';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import changeHandler from '../utils/handleChange';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';

// const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`tabpanel-${index}`}
//             aria-labelledby={`tab-${index}`}
//             {...other}
//         >
//             {value === index && <>{children}</>}
//         </div>
//     );
// };

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
    primaryInputBox: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
    secondaryInputBox: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
    inputBoxInput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    badgeIcon: {
        marginRight: theme.spacing(4),
    },
    spaceTop: {
        marginTop: theme.spacing(1),
    },
}));

const NewApplication = () => {
    const classes = useStyles();
    const history = useHistory();
    const defaultValues = {
        businessName: '',
        roleTitle: '',
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
    };

    const [values, setValues] = useState(defaultValues);
    // const [currentTab, setCurrentTab] = useState(0);
    const [showAddInterview, setShowAddInterview] = useState(true);
    const [contactsChooserOpen, setContactsChooserOpen] = useState(false);
    const [resumesChooserOpen, setResumesChooserOpen] = useState(false);
    const [todoNewOpen, setTodoNewOpen] = useState(false);
    const [contactNewOpen, setContactNewOpen] = useState(false);
    const [resumeNewOpen, setResumeNewOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState('primary');
    const handleChange = changeHandler(values, setValues);
    const [, dispatch, { processServerResponse, sendMessage }] = useGlobalStore();

    const handleReset = () => {
        // TODO add confirmation before wipe
        setValues(defaultValues);
    };

    // Contacts
    const setSelectedContact = (selectedContactChoice) => {
        setContactsChooserOpen(false);

        if (!selectedContactChoice) return;

        if (selectedContactChoice === 'addContact') {
            setContactNewOpen(true);
            return;
        }

        // checking not a duplicate
        if (values.contacts.map((contact) => contact._id).includes(selectedContactChoice._id)) return;

        let contacts = values.contacts;
        contacts.push(selectedContactChoice);
        setValues({ ...values, contacts });
    };

    const saveContact = (contact) => {
        setContactNewOpen(false);
        if (!contact) return;
        // if (!contact._id) contact._id = values.contacts.length + 1;
        let contacts = values.contacts;
        contacts.push(contact);
        setValues({ ...values, contacts });
    };

    const removeContact = (contactID) => {
        let contacts = values.contacts;
        contacts = contacts.filter((contact) => contact._id !== contactID);
        setValues({ ...values, contacts });
    };

    // Resumes
    const setSelectedResume = (selectedResumeChoice) => {
        setResumesChooserOpen(false);

        if (!selectedResumeChoice) return;

        if (selectedResumeChoice === 'addResume') {
            setResumeNewOpen(true);
            return;
        }

        // checking not a duplicate
        if (values.resumes.map((resume) => resume._id).includes(selectedResumeChoice._id)) return;

        let resumes = values.resumes;
        resumes.push(selectedResumeChoice);
        setValues({ ...values, resumes });
    };

    const saveResume = (resume) => {
        setResumeNewOpen(false);
        if (!resume) return;
        let resumes = values.resumes;
        if (!resume._id) resume._id = resumes.length + 1;
        resumes.push(resume);
        setValues({ ...values, resumes });
    };

    const removeResume = (resumeID) => {
        let resumes = values.resumes;
        resumes = resumes.filter((resume) => resume._id !== resumeID);
        setValues({ ...values, resumes });
    };

    // Todos
    const saveTodo = (todo) => {
        setTodoNewOpen(false);
        if (!todo) return;

        if (!todo._id) {
            todo._id = values.todos.length + 1;
        }

        let todos = values.todos;
        todos.push(todo);
        setValues({ ...values, todos });
    };

    const removeTodo = (todoID) => {
        let todos = values.todos;
        todos = todos.filter((todo) => todo._id !== todoID);
        setValues({ ...values, todos });
    };

    //Interviews
    const addInterview = (interview) => {
        setShowAddInterview(false);
        let interviewsArray = values.interviewsArray;
        if (!interview._id) {
            // Adding a temp ID to be replaced by the DB ID later
            interview._id = interviewsArray.length + 1;
        }
        interviewsArray.push(interview);
        setValues({ ...values, interviewsArray });
        console.log(values.interviewsArray);
    };

    const removeInterview = (interviewID) => {
        let interviewsArray = values.interviewsArray;
        interviewsArray = interviewsArray.filter((interview) => interview._id != interviewID);
        setValues({ ...values, interviewsArray });
    };

    // Saving to DB
    const handleSave = async () => {
        let applicationData = JSON.parse(JSON.stringify(values));
        // Removing the temporary IDs created, so they're replaced on the server by UUIDs.
        applicationData.interviewsArray = applicationData.interviewsArray.map((interview) => {
            delete interview._id;
            return interview;
        });
        applicationData.todos = applicationData.todos.map((todo) => ({ _id: todo._id }));
        applicationData.resumes = applicationData.resumes.map((resume) => ({ _id: resume._id }));
        applicationData.contacts = applicationData.contacts.map((contact) => ({ _id: contact._id }));

        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.post('/api/applications', applicationData);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return
        if (serverResponse.application) {
            setValues(defaultValues);
            setTimeout(() => {
                console.log('SUCCESS MOVING TO NEXT PAGE');
                history.push('/applications');
            }, 4000);
        }
    };

    // const handleChangeTab = (event, newValue) => {
    //     setCurrentTab(newValue);
    // };

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    return (
        <div>
            {/* <Paper>
                <Tabs
                    value={currentTab}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTab}
                >
                    <Tab label="Details" icon={<WorkIcon />} />
                    <Tab label="Contacts" icon={<ContactsIcon />} />
                    <Tab label="Resumes" icon={<DescriptionIcon />} />
                    <Tab label="Todos/Reminders" icon={<AddAlertIcon />} />
                </Tabs>
            </Paper> */}
            {/* <Accordion expanded={expandedAccordion === 'primary'} onChange={handleChangeAccordion('primary')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="details-content" id="details-header">
                    Details
                </AccordionSummary>
                <AccordionDetails> */}
            <Grid container direction="column">
                <Box className={classes.primaryInputBox} display="flex" flexDirection="column" borderRadius={5}>
                    <TextField
                        className={classes.inputBoxInput}
                        onChange={handleChange('businessName')}
                        value={values.businessName}
                        label="Business Name"
                        type="text"
                        variant="filled"
                        required
                    />
                    <TextField
                        className={classes.inputBoxInput}
                        onChange={handleChange('roleTitle')}
                        value={values.roleTitle}
                        label="Role"
                        type="text"
                        variant="filled"
                        required
                    />
                </Box>
                {/* <Divider style={{ marginTop: '1em', marginBottom: '1em' }} /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-found-picker"
                        label="Date Found"
                        format="dd/MM/yyyy"
                        value={values.dateFound}
                        onChange={handleChange('dateFound', 'date')}
                        inputVariant="outlined"
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <InputField name="foundWhereNote" label="Where was it found?" {...{ values, handleChange }} />
                <InputField name="postLink" label="Job Posting Link" {...{ values, handleChange }} />
                <InputField
                    multiline
                    rows={4}
                    name="requirementsNote"
                    label="Job Requirements"
                    {...{ values, handleChange }}
                />
                <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
                <InputField multiline rows={4} name="notes" label="Notes" {...{ values, handleChange }} />
                <Box className={classes.primaryInputBox} display="flex" flexDirection="column" borderRadius={5}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.haveApplied}
                                    onChange={handleChange('haveApplied', 'check')}
                                    name="haveApplied"
                                />
                            }
                            label="Applied"
                        />
                    </FormGroup>
                    {values.haveApplied && (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-found-picker"
                                label="Date Applied"
                                format="dd/MM/yyyy"
                                value={values.appliedDate}
                                onChange={handleChange('appliedDate', 'date')}
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    )}
                </Box>
                <Box className={classes.primaryInputBox} display="flex" flexDirection="column" borderRadius={5}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.haveResearched}
                                    onChange={handleChange('haveResearched', 'check')}
                                    name="haveResearched"
                                />
                            }
                            label="Researched the company?"
                        />
                    </FormGroup>
                    {values.haveResearched && (
                        <InputField
                            multiline
                            rows={4}
                            name="haveResearchedNotes"
                            label="Research Notes"
                            {...{ values, handleChange }}
                        />
                    )}
                </Box>
            </Grid>
            {/* </AccordionDetails>
            </Accordion> */}
            <Accordion
                className={classes.spaceTop}
                expanded={expandedAccordion === 'interviews'}
                onChange={handleChangeAccordion('interviews')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="interviews-content"
                    id="interviews-header"
                >
                    <Badge badgeContent={values.interviewsArray.length} color="primary" className={classes.badgeIcon}>
                        <ForumOutlinedIcon />
                    </Badge>
                    <Typography variant="h6">Interviews</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        {/* <Box
                            className={classes.secondaryInputBox}
                            display="flex"
                            flexDirection="column"
                            borderRadius={5}
                        > */}
                        {/* {values.interviewsArray.length > 0 && <Typography variant="subtitle2">Interviews</Typography>} */}
                        {values.interviewsArray.length > 0 && (
                            <List dense={true}>
                                {values.interviewsArray.map((interview, index) => (
                                    <InterviewInformation handleRemove={removeInterview} {...interview} />
                                ))}
                            </List>
                        )}
                        {showAddInterview && (
                            <InterviewAddition
                                saveInterview={addInterview}
                                handleCancel={() => setShowAddInterview(false)}
                            />
                        )}
                        {/* ADD INTERVIEW
                        Push an empty default value set to the array of interviews,
                        let the edit mode of the interview information field handle it,
                        editing it in the array.  When save is pushed, add it
                        OR
                        have a boolean for adding one, when the boolean is true show addition
                        when save is hit or cancel in the addition field, push
                    */}
                        {!showAddInterview && <Button onClick={() => setShowAddInterview(true)}>Add Interview</Button>}
                        {/* </Box> */}
                        {/* <Divider style={{ marginTop: '1em', marginBottom: '1em' }} /> */}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expandedAccordion === 'contacts'} onChange={handleChangeAccordion('contacts')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contacts-content" id="contacts-header">
                    <Badge badgeContent={values.contacts.length} color="primary" className={classes.badgeIcon}>
                        <ContactsIcon />
                    </Badge>
                    <Typography variant="h6">Contacts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        <List dense={true}>
                            {values.contacts.map((contact) => (
                                <ContactListItem handleRemove={removeContact} {...contact} />
                            ))}
                        </List>
                        <Button onClick={() => setContactsChooserOpen(true)}>Add Contact</Button>
                        <ContactChooser open={contactsChooserOpen} onClose={setSelectedContact} />
                        <ContactNew
                            open={contactNewOpen}
                            saveContact={saveContact}
                            businessName={values.businessName}
                        />
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expandedAccordion === 'resumes'} onChange={handleChangeAccordion('resumes')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="resumes-content" id="resumes-header">
                    <Badge badgeContent={values.resumes.length} color="primary" className={classes.badgeIcon}>
                        <DescriptionIcon />
                    </Badge>
                    <Typography variant="h6">Resumes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        {/* <Divider style={{ marginTop: '1em', marginBottom: '1em' }} /> */}
                        <List dense={true}>
                            {values.resumes.map((resume) => (
                                <ResumeListItem handleRemove={removeResume} {...resume} />
                            ))}
                        </List>
                        <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button>
                        <ResumeChooser open={resumesChooserOpen} onClose={setSelectedResume} />
                        <ResumeNew open={resumeNewOpen} saveResume={saveResume} />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {/* <Divider style={{ marginTop: '1em', marginBottom: '1em' }} /> */}

            <Accordion expanded={expandedAccordion === 'todos'} onChange={handleChangeAccordion('todos')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="todos-content" id="todos-header">
                    <Badge badgeContent={values.todos.length} color="primary" className={classes.badgeIcon}>
                        <AddAlertIcon />
                    </Badge>
                    <Typography variant="h6">Todos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        <List dense={true}>
                            {values.todos.map((todo, index) => (
                                <TodoListItem handleRemove={removeTodo} key={index} {...todo} />
                            ))}
                        </List>
                        <Button onClick={() => setTodoNewOpen(true)}>Add Todo/Reminder</Button>
                        <TodoNew open={todoNewOpen} saveTodo={saveTodo} />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
            <Grid container justify="space-evenly" alignItems="center">
                <Button onClick={handleReset} variant="contained" color="secondary">
                    Reset
                </Button>
                {/* <Button onClick={handleSave} variant="contained" color="primary">
                    Save Application
                </Button> */}
                <ResponsiveSave onClick={handleSave} buttonText="Save Application" />
            </Grid>
        </div>
    );
};

export default NewApplication;
