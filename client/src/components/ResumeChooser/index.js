import React, { useState, useEffect } from 'react';
import {
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
import { useGlobalStore } from '../GlobalStore';

const ResumeChooser = (props) => {
    const { open, onClose } = props;
    const [resumes, setResumes] = useState([]);
    const [, , { API, loadResource }] = useGlobalStore();

    useEffect(() => {
        if (open && resumes.length === 0) {
            console.log('Use effect called, no resumes present so dialog skipped to add resume')
            onClose('addResume');
        }
        // eslint-disable-next-line
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const fetchResumes = async () => {
        loadResource(async () => API.getResumes(), 'resumes', setResumes, false);
    };

    useEffect(() => {
        fetchResumes();
        // eslint-disable-next-line
    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="resume selection" open={open}>
            <DialogTitle id="resume-selection">Saved Resumes</DialogTitle>
            <List>
                {resumes.map((resume, index) => (
                    <ListItem button onClick={() => handleListItemClick(resume)} key={resume._id || index}>
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
