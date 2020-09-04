import React, { useState } from 'react';
import { Grid, List } from '@material-ui/core';
import ResumeNew from '../ResumeNew';
import ResumeChooser from '../ResumeChooser';
import ResumeListItem from '../ResumeListItem';
import AddButton from '../AddButton';
import { useGlobalStore } from '../GlobalStore';

const ResumeListSection = (props) => {
    const { resumes, updateResumes, applicationID } = props;
    const [resumesChooserOpen, setResumesChooserOpen] = useState(false);
    const [resumeNewOpen, setResumeNewOpen] = useState(false);
    const [viewResumeItem, setViewResumeItem] = useState({});
    const [, dispatch, { processServerResponse, API }] = useGlobalStore();

    const saveResume = (resume) => {
        setResumeNewOpen(false);
        setResumesChooserOpen(false);
        setViewResumeItem({});
        if (!resume) return;
        if (resume === 'addResume') {
            setResumeNewOpen(true);
            return;
        }

        let newResumes = resumes;
        if (!resume._id) resume._id = newResumes.length + 1;

        newResumes = newResumes.filter((existingResume) => existingResume._id !== resume._id);

        newResumes.push(resume);
        updateResumes(newResumes);
    };

    const removeResume = (resumeID) => {
        let newResumes = resumes;
        newResumes = newResumes.filter((resume) => resume._id !== resumeID);
        updateResumes(newResumes);
    };

    const viewResume = (resume) => {
        console.log('view', resume)
        setViewResumeItem(resume);
        setResumeNewOpen(true);
    };

    const deleteResume = async (resumeID) => {
        setResumeNewOpen(false);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteResume(resumeID, applicationID);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp == false) return;
        if (serverResponse.resumes) {
            updateResumes(serverResponse.resumes);
        }
    };

    return (
        <Grid container direction="column">
            <List dense={true}>
                {resumes.map((resume) => (
                    <ResumeListItem key={resume._id} handleRemove={removeResume} viewResume={viewResume} {...resume} />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={() => setResumesChooserOpen(true)} />
            <ResumeChooser open={resumesChooserOpen} onClose={saveResume} />
            <ResumeNew
                open={resumeNewOpen}
                saveResume={saveResume}
                existingResume={viewResumeItem}
                deleteResume={deleteResume}
            />
        </Grid>
    );
};

export default ResumeListSection;
