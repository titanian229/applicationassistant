import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import formatDate from '../../utils/formatDate';

const useStyles = makeStyles((theme) => ({
    indented: {
        marginLeft: theme.spacing(5)
    }
}))

const InterviewInformation = (props) => {
    const { handleRemove, _id, date, interviewType, notes } = props;
    const [showDetails, setShowDetails] = useState(false);
    const classes = useStyles()
    const formattedDate = formatDate(date);
    const formattedInterviewType = {
        inperson: 'In Person',
        teleconference: 'Teleconference',
        phone: 'Phone',
        email: 'Email',
    }[interviewType];
    
    return (
        <>
            <ListItem key={String(date)}>
                <ListItemIcon>
                    <IconButton onClick={() => setShowDetails(!showDetails)}>
                        {!showDetails ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={formattedDate} secondary={formattedInterviewType} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(_id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
                <Typography variant="subtitle2" className={classes.indented}>{notes}</Typography>
            </Collapse>
        </>
    );
};

export default InterviewInformation;
