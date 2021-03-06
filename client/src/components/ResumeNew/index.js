import React, { useState, useEffect } from 'react';
import {
    // Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    // Button,
    Grid,
    // IconButton,
    // InputAdornment,
    // TextField,
    // List,
    // ListItem,
    // ListItemText,
    // ListItemIcon,
    // Avatar,
    // ListItemAvatar,
    // ListItemSecondaryAction,
    // FormControl,
    // Select,
    // InputLabel,
    // MenuItem,
} from '@material-ui/core';

import InputField from '../InputField';
import ConfirmationButtons from '../ConfirmationButtons';
import { useGlobalStore } from '../GlobalStore';

const ResumeNew = (props) => {
    const { open, saveResume, existingResume, deleteResume } = props;
    const [, dispatch, { processServerResponse, changeHandler, API }] = useGlobalStore();

    const defaultValues = {
        name: '',
        notes: '',
        link: '',
    };
    const [values, setValues] = useState(defaultValues);
    const handleChange = changeHandler(values, setValues);

    useEffect(() => {
        if (!existingResume) return;
        if (existingResume._id) {
            setValues({ ...defaultValues, ...existingResume });
        }
        // eslint-disable-next-line
    }, [existingResume]);

    const handleClose = () => {
        setValues(defaultValues);
        saveResume();
    };

    const handleSave = async () => {
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = !existingResume._id
            ? await API.post('/api/resumes', values)
            : await API.updateResume(existingResume._id, values);
        const serverUp = processServerResponse(serverResponse);

        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;

        if (serverResponse.resume) {
            saveResume(serverResponse.resume);
            setValues(defaultValues);
        }
    };

    const handleDelete = async () => {
        deleteResume(values._id);
        setValues(defaultValues);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="resume-dialog">
            <DialogTitle id="resume-dialog">{existingResume._id ? 'Edit' : 'New'} Resume</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add a resume to link to this application. Add a link to the resume, saved in Google Drive or
                    Dropbox.
                </DialogContentText>
                <Grid container direction="column">
                    <InputField name="name" label="Name" {...{ values, handleChange }} />
                    <InputField name="link" label="Link" {...{ values, handleChange }} />
                    <InputField name="notes" label="Notes" {...{ values, handleChange }} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <ConfirmationButtons
                    handleDelete={!existingResume._id ? '' : handleDelete}
                    {...{ handleClose, handleSave }}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ResumeNew;
