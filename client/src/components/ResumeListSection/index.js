import React, { useState } from 'react';
import { Grid, List } from '@material-ui/core';
import ResumeNew from '../ResumeNew';
import ResumeChooser from '../ResumeChooser';
import ResumeListItem from '../ResumeListItem';
import AddButton from '../AddButton';

const ResumeListSection = (props) => {
    const { resumes, updateResumes } = props;
    const [resumesChooserOpen, setResumesChooserOpen] = useState(false);
    const [resumeNewOpen, setResumeNewOpen] = useState(false);

    const saveResume = (resume) => {
        setResumeNewOpen(false);
        setResumesChooserOpen(false);
        if (!resume) return;
        if (resume === 'addResume') {
            setResumeNewOpen(true);
            return;
        }
        
        let newResumes = resumes;
        if (!resume._id) resume._id = newResumes.length + 1;
        if (resumes.map((resume) => resume._id).includes(resume._id)) return;
        newResumes.push(resume);
        updateResumes(newResumes);
    };

    const removeResume = (resumeID) => {
        let newResumes = resumes;
        newResumes = newResumes.filter((resume) => resume._id !== resumeID);
        updateResumes(newResumes);
    };

    return (
        <Grid container direction="column">
            <List dense={true}>
                {resumes.map((resume) => (
                    <ResumeListItem handleRemove={removeResume} {...resume} />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={() => setResumesChooserOpen(true)} />
            <ResumeChooser open={resumesChooserOpen} onClose={saveResume} />
            <ResumeNew open={resumeNewOpen} saveResume={saveResume} />
        </Grid>
    );
};

export default ResumeListSection;
