import React, { useState } from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';

import InputField from '../InputField';
import ConfirmationButtons from '../ConfirmationButtons';
import changeHandler from '../../utils/handleChange';

const ResumeNew = (props) => {
    const { open, saveResume } = props;

    const defaultValues = {
        name: '',
        notes: '',
        link: '',
    };
    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);

    const handleClose = () => {
        setValues(defaultValues);
        saveResume();
    };

    const handleSave = () => {
        setValues(defaultValues);
        saveResume(values);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="resume-dialog">
            <DialogTitle id="resume-dialog">New Resume</DialogTitle>
            <DialogContent>
                <DialogContentText>Add a resume to link to this application.  Add a link to the resume, saved in Google Drive or Dropbox.</DialogContentText>
                {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
                <Grid container direction="column">
                    <InputField name="name" label="Name" {...{ values, handleChange }} />
                    <InputField name="link" label="Link" {...{ values, handleChange }} />
                    <InputField name="notes" label="Notes" {...{ values, handleChange }} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <ConfirmationButtons {...{ handleClose, handleSave }} />
            </DialogActions>
        </Dialog>
    );
};

export default ResumeNew;