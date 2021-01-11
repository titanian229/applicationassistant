import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    List,
    // Accordion as MuiAccordion,
    // AccordionSummary as MuiAccordionSummary,
} from '@material-ui/core';

import { useGlobalStore } from '../GlobalStore';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InterviewInformation from '../InterviewInformation';
import InterviewAddition from '../InterviewAddition';
import AddButton from '../AddButton';
// import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

const useStyles = makeStyles((theme) => ({
    primaryInputBox: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
    secondaryInputBox: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
    inputBoxInput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    badgeIcon: {
        marginRight: theme.spacing(4),
    },
    spaceTop: {
        marginTop: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
}));

const InterviewListSection = (props) => {
    // This section
    // Display all existing interviews, with ability to edit or delete
    // Allow for creation of new interview, pushing it into the array for the parent application
    // This section should be as self contained as possible, but because the interviews are always children it will need to recieve the application ID from the parent

    const { interviewsArray, refreshInterviews, applicationID } = props;
    const [showAddInterview, setShowAddInterview] = useState(false);
    const classes = useStyles();
    const [, , { API, processServerResponse }] = useGlobalStore();

    const removeInterview = async (_id) => {
        console.log('remove called for ', _id);
        // send request to delete it to the server, refresh interviews
        const serverResponse = await API.deleteInterview(applicationID, _id);
        const serverUp = processServerResponse(serverResponse);
        if (serverUp === false) return;

        refreshInterviews();
    };

    const addInterview = async (interview) => {
        console.log('Add interview called', interview);
        const serverResponse = await API.associateItem(applicationID, interview, 'push', 'interviewsArray');
        const serverUp = processServerResponse(serverResponse);
        if (serverUp === false) return;
        if (serverResponse.application) {
            setShowAddInterview(false);
            refreshInterviews();
        }
    };

    return (
        <Grid container direction="column">
            <Typography className={classes.title} variant="h6" align="center">
                Interviews
            </Typography>
            {interviewsArray.length > 0 && (
                <List dense>
                    {interviewsArray.map((interview, index) => (
                        <InterviewInformation key={index} handleRemove={removeInterview} {...interview} />
                    ))}
                </List>
            )}
            {showAddInterview && (
                <InterviewAddition saveInterview={addInterview} handleCancel={() => setShowAddInterview(false)} />
            )}

            {!showAddInterview && <AddButton onClick={() => setShowAddInterview(true)} />}
        </Grid>
    );
};

export default InterviewListSection;
