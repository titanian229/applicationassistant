import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    // InputAdornment,
    // IconButton,
    // Paper,
    Grid,
    Box,
    // Container,
    // Select,
    // Input,
    // InputLabel,
    // Checkbox,
    // MenuItem,
    // FormControl,
    List,
    // ListItem,
    // ListItemText,
    FormGroup,
    FormControlLabel,
    Switch,
    Divider,
    // Tab,
    // Tabs,
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
import TodoListItem from '../components/TodoListItem';
import TodoNew from '../components/TodoNew';
import ResponsiveSave from '../components/ResponsiveSave';
import AddButton from '../components/AddButton';

import ResumeListSection from '../components/ResumeListSection';
import ContactListSection from '../components/ContactListSection';

import LoadingOverlay from '../components/LoadingOverlay';

import ColourChooser from '../components/ColourChooser'

import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import { Accordion, AccordionSummary } from '../components/Accordion';

import { useGlobalStore } from '../components/GlobalStore';

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
    const { id } = useParams();
    const defaultValues = {
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
    };

    const [values, setValues] = useState(defaultValues);
    // const [currentTab, setCurrentTab] = useState(0);
    const [showAddInterview, setShowAddInterview] = useState(true);

    const [todoNewOpen, setTodoNewOpen] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState('primary');
    const [, dispatch, { processServerResponse, API, changeHandler, loadResource }] = useGlobalStore();
    const handleChange = changeHandler(values, setValues);

    useEffect(() => {
        if (id) {
            console.log('ID Change UseEffect called', id);
            loadResource(async () => API.getApplication(id), 'application', setExistingApplicationValues);
        }
    }, [id]);

    const setExistingApplicationValues = (application) => {
        setValues({ ...values, ...application });
    };

    const handleReset = () => {
        // TODO add confirmation before wipe
        setValues(defaultValues);
    };

    const handleCancel = () => {
        history.push(`/applications/${id || ''}`)
    }

    // Todos
    const saveTodo = (todo) => {
        setTodoNewOpen(false);
        if (!todo) return;

        let todos = values.todos;
        todos.push(todo);
        setValues({ ...values, todos });
    };

    const removeTodo = (todo) => {
        console.log('removeTodo -> todoID', todo);
        let todos = values.todos;
        todos = todos.filter((existingTodo) => existingTodo._id !== todo._id);
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
        interviewsArray = interviewsArray.filter((interview) => interview._id !== interviewID);
        setValues({ ...values, interviewsArray });
    };

    // Saving to DB
    const handleSave = async () => {
        let applicationData = JSON.parse(JSON.stringify(values));
        // Removing the temporary IDs created, so they're replaced on the server by UUIDs.
        applicationData.interviewsArray = applicationData.interviewsArray.map((interview) => {
            if (Number.isInteger(interview._id)) delete interview._id;
            return interview;
        });
        applicationData.todos = applicationData.todos.map((todo) => {
            if (Number.isInteger(todo._id)) delete todo._id;
            return todo;
        });
        applicationData.resumes = applicationData.resumes.map((resume) => ({ _id: resume._id }));
        applicationData.contacts = applicationData.contacts.map((contact) => ({ _id: contact._id }));

        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = id
            ? await API.updateApplication(id, applicationData)
            : await API.post('/api/applications', applicationData);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse.application) {
            setValues(defaultValues);
            setTimeout(() => {
                console.log('SUCCESS MOVING TO NEXT PAGE');
                history.push('/applications');
            }, 2000);
        }
    };

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    const changeItemAssociations = (action, itemType) => (item) => {
        console.log('Changing associations for ', itemType, action, item);
        let itemList = values[itemType];
        itemList = itemList.filter((existingItem) => existingItem._id !== item._id);
        if (action === 'add') {
            itemList.push(item);
        }
        setValues({ ...values, [itemType]: itemList });
    };

    const setColour = (colour) => {
        setValues({...values, colour})
    }

    return (
        <div>
            <Grid container direction="column">
                <Box className={classes.primaryInputBox} display="flex" flexDirection="column" borderRadius={5}>
                    <Grid container direction='row' justify='space-between' alignItems='center'>
                        <Typography variant='subtitle1'>New Application</Typography>
                        <ColourChooser colour={values.colour} setColour={setColour} />
                    </Grid>
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
                <InputField name="location" label="Location" {...{ values, handleChange }} />
                <InputField
                    multiline
                    rows={4}
                    name="description"
                    label="Job Description"
                    {...{ values, handleChange }}
                />
                <InputField
                    multiline
                    rows={4}
                    name="requirementsNote"
                    label="Job Requirements"
                    {...{ values, handleChange }}
                />
                <InputField multiline rows={4} name="companyInfo" label="Company Info" {...{ values, handleChange }} />
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

                        {!showAddInterview && <AddButton onClick={() => setShowAddInterview(true)} />}
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
                    <ContactListSection
                        contacts={values.contacts}
                        refreshContacts={() => {}}
                        applicationParent={{
                            associateContact: changeItemAssociations('add', 'contacts'),
                            dissociateContact: changeItemAssociations('remove', 'contacts'),
                        }}
                    />
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
                    <ResumeListSection
                        resumes={values.resumes}
                        refreshResumes={() => {}}
                        applicationParent={{
                            associateResume: changeItemAssociations('add', 'resumes'),
                            dissociateResume: changeItemAssociations('remove', 'resumes'),
                        }}
                    />
                </AccordionDetails>
            </Accordion>
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
                                <TodoListItem handleRemove={removeTodo} key={index} todo={todo} {...todo} />
                            ))}
                        </List>
                        <AddButton onClick={() => setTodoNewOpen(true)} />
                        <TodoNew open={todoNewOpen} saveTodo={saveTodo} todoCount={values.todos.length} />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
            <Grid container justify="space-evenly" alignItems="center">
                {!id && (
                    <Button onClick={handleReset} variant="contained" color="secondary">
                        Reset
                    </Button>
                )}
                {id && (
                    <Button onClick={handleCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                )}
                <ResponsiveSave onClick={handleSave} buttonText="Save Application" />
            </Grid>
            {id && <LoadingOverlay />}
        </div>
    );
};

export default NewApplication;
