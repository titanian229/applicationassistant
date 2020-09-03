import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    Dialog,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../InputField';
// import changeHandler from '../../utils/handleChange';
// import API from '../../utils/API'
import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({}));

const ResumeChooser = (props) => {
    const classes = useStyles();
    const { open, onClose } = props;
    const [resumes, setResumes] = useState([]);
    const [, , { API, loadResource }] = useGlobalStore();

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const fetchResumes = async () => {
        loadResource(async () => API.getResumes(), 'resumes', setResumes, false);
        // const serverReturn = await API.getResumes();
        // if (!serverReturn) {
        //     console.log('error fetching resumes');
        //     return;
        // }
        // if (serverReturn.error || !serverReturn.resumes) {
        //     console.log('error fetching resumes');
        //     return;
        // }
        // setResumes(serverReturn.resumes);
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="resume selection" open={open}>
            <DialogTitle id="resume-selection">Saved Resumes</DialogTitle>
            <List>
                {resumes.map((resume) => (
                    <ListItem button onClick={() => handleListItemClick(resume)} key={resume.name}>
                        <ListItemAvatar>
                            <Avatar>
                                <DescriptionIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={resume.name} secondary={resume.note} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addResume')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add Resume" />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default ResumeChooser;
