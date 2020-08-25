import React, { useState } from 'react';
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
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../components/InputField';
import InterviewInformation from '../components/InterviewInformation';
import InterviewAddition from '../components/InterviewAddition';
import changeHandler from '../utils/handleChange'

const useStyles = makeStyles((theme) => ({
    primaryInputBox: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        padding: theme.spacing(1),
    },
    secondaryInputBox: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        padding: theme.spacing(1),
    },
    inputBoxInput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const NewApplication = () => {
    const classes = useStyles();
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
        showAddInterview: false,
    };

    const defaultInterviewInfo = {
        date: null,
        interviewType: 'phone',
        notes: '',
    };

    const [values, setValues] = useState(defaultValues);

    const handleTextChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChange = changeHandler(values, setValues)


    // const handleChange = (prop, type = 'text') => {
    //     switch (type) {
    //         case 'text':
    //             return (event) => setValues({ ...values, [prop]: event.target.value });
    //             break;
    //         case 'date':
    //             return (date) => setValues({ ...values, [prop]: date });
    //             break;
    //         case 'check':
    //             return (event) => setValues({ ...values, [prop]: event.target.checked });
    //             break;
    //         default:
    //             console.log('Handle change handler had no case');
    //             break;
    //     }
    // };

    return (
        <div>
            <Grid container direction="column">
                <Box
                    className={classes.primaryInputBox}
                    display="flex"
                    flexDirection="column"
                    border={1}
                    borderRadius={5}
                    borderColor="primary.light"
                >
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
                <InputField
                    multiline
                    rows={4}
                    name="requirementsNote"
                    label="Job Requirements"
                    {...{ values, handleChange }}
                />
                <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
                <Box
                    className={classes.primaryInputBox}
                    display="flex"
                    flexDirection="column"
                    border={1}
                    borderRadius={5}
                    borderColor="primary.light"
                >
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
                <Box
                    className={classes.primaryInputBox}
                    display="flex"
                    flexDirection="column"
                    border={1}
                    borderRadius={5}
                    borderColor="primary.light"
                >
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
                <Box
                    className={classes.secondaryInputBox}
                    display="flex"
                    flexDirection="column"
                    border={1}
                    borderRadius={5}
                    borderColor="secondary.light"
                >
                    {values.interviewsArray.map((interview, index) => (
                        <InterviewInformation interview={interview} key={index} index={index} />
                    ))}
                    {values.showAddInterview > 0 && <InterviewAddition />}
                    {/* ADD INTERVIEW
                        Push an empty default value set to the array of interviews,
                        let the edit mode of the interview information field handle it,
                        editing it in the array.  When save is pushed, add it
                        OR
                        have a boolean for adding one, when the boolean is true show addition
                        when save is hit or cancel in the addition field, push
                    */}
                    <Button onClick={() => setValues({ ...values, showAddInterview: !values.showAddInterview })}>
                        Add Interview
                    </Button>
                </Box>
            </Grid>
        </div>
    );
};

export default NewApplication;
