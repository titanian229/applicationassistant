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
import InputField from '../InputField';
import changeHandler from '../../utils/handleChange';

const InterviewAddition = (props) => {
    const defaultInterview = {
        date: null,
        interviewType: 'phone',
        interviewContactNames: [],
        notes: '',
    };
    const [values, setValues] = useState(defaultInterview);
    const handleChange = changeHandler(values, setValues);

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="interview-date-picker"
                    label="Interview Date"
                    format="dd/MM/yyyy"
                    value={values.date}
                    onChange={handleChange('date', 'date')}
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined">
                <InputLabel id="interview-type-select">Interview Type</InputLabel>
                <Select
                    labelId="interview-type-select"
                    id="interview-type-select-selecter"
                    value={values.interviewType}
                    onChange={handleChange('interviewType')}
                    label="Interview Type"
                >
                    <MenuItem value='email'>Email</MenuItem>
                    <MenuItem value='phone'>Phone</MenuItem>
                    <MenuItem value='inperson'>In Person</MenuItem>
                    <MenuItem value='teleconference'>Teleconference</MenuItem>
                </Select>
            </FormControl>
            <InputField multiline rows={3} name="notes" label="Interview Notes" {...{ values, handleChange }} />
        </>
    );
};

export default InterviewAddition;
