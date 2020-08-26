import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Grid,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../InputField';
import changeHandler from '../../utils/handleChange';

const TodoNew = (props) => {
    const { open, saveTodo } = props;
    const defaultValues = {
        name: '',
        date: null,
    };
    // TODO add the associated contact or application in whatever element creates this component
    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);

    const handleClose = () => {
        saveTodo();
    };

    const handleSave = () => {
        if (values.name === '') return;
        if (values.date === null)
        delete values.date
        saveTodo(values);
        setValues(defaultValues)
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="todo-dialog">
            <DialogTitle id="todo-dialog">New Todo/Reminder</DialogTitle>
            <DialogContent>
                <DialogContentText>Add a todo, with an optional date for a reminder</DialogContentText>
                {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
                <Grid container direction='column'>
                    <InputField name="name" label="Todo" {...{ values, handleChange }}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-reminder-picker"
                            label="Reminder"
                            format="dd/MM/yyyy"
                            value={values.date}
                            onChange={handleChange('date', 'date')}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TodoNew;
