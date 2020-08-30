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
import API from '../../utils/API'
import {useGlobalStore} from '../GlobalStore'
import ConfirmationButtons from '../ConfirmationButtons'

const TodoNew = (props) => {
    const { open, saveTodo } = props;
    const defaultValues = {
        name: '',
        date: null,
    };
    // TODO add the associated contact or application in whatever element creates this component
    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);
    const [, dispatch, {processServerResponse, sendMessage}] = useGlobalStore()

    const handleClose = () => {
        saveTodo();
    };

    const handleSave = async () => {
        const todoValues = JSON.parse(JSON.stringify(values))
        if (todoValues.name === '') {
            // dispatch({ do: 'displayMessage', message: { text: 'Todo must have text', type: 'warning' } });
            sendMessage('Todo must have text', {variant: "error", key: 'todotextmissing'})
            return
        }
        if (todoValues.date === null) delete todoValues.date;
        dispatch({do: 'setLoading', loading: true})
        const serverResponse = await API.post('/api/todos', todoValues)
        const serverUp = processServerResponse(serverResponse)
        dispatch({do: 'setLoading', loading: false})
        if (serverUp === false) return
        if (serverResponse.todo){
            saveTodo(serverResponse.todo);
            setValues(defaultValues);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="todo-dialog">
            <DialogTitle id="todo-dialog">New Todo/Reminder</DialogTitle>
            <DialogContent>
                <DialogContentText>Add a todo, with an optional date for a reminder</DialogContentText>
                {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
                <Grid container direction="column">
                    <InputField name="name" label="Todo" {...{ values, handleChange }} />
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
                <ConfirmationButtons {...{handleClose, handleSave}} />
            </DialogActions>
        </Dialog>
    );
};

export default TodoNew;
