import React, { useState } from 'react';
import { Grid, List } from '@material-ui/core';
import ResumeNew from '../ResumeNew';
import ResumeChooser from '../ResumeChooser';
import ResumeListItem from '../ResumeListItem';
import AddButton from '../AddButton';
import { useGlobalStore } from '../GlobalStore';

const ResumeListSection = (props) => {
    const { resumes, refreshResumes, applicationParent } = props;
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

        if (applicationParent) {
            applicationParent.associateResume(resume);
        }
        refreshResumes();
    };

    const viewResume = (resume) => {
        console.log('view', resume);
        setViewResumeItem(resume);
        setResumeNewOpen(true);
    };

    const deleteResume = async (resumeID) => {
        setResumeNewOpen(false);
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteResume(resumeID);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        refreshResumes();
    };

    const handleDissociateResume = (resume) => {
        if (applicationParent) {
            applicationParent.dissociateResume(resume);
            refreshResumes();
        }
    };

    const handleAdd = () => {
        if (applicationParent) {
            setResumesChooserOpen(true);
            return;
        }
        saveResume('addResume');
    };

    return (
        <Grid container direction="column">
            <List dense={true}>
                {resumes.map((resume) => (
                    <ResumeListItem
                        key={resume._id}
                        handleRemove={applicationParent ? handleDissociateResume : ''}
                        viewResume={viewResume}
                        resume={resume}
                    />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={handleAdd} />
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
