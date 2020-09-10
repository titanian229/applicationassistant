import React from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    // CardMedia,
    CardContent,
    // CardActions,
    CardActionArea,
    Avatar,
    // IconButton,
    // Button,
    // Chip,
    Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import FavoriteIcon from '@material-ui/icons/Favorite';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
// import WorkIcon from '@material-ui/icons/WorkTwoTone';
// import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import StatusArray from '../StatusArray';
// TODO set the colour based on the value

const useStyles = makeStyles((theme) => ({
    applicationCard: {
        // maxWidth: 320,
        margin: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 320,
        },
    },

    cardContent: {
        marginBottom: theme.spacing(2),
    },
    rightIcon: {
        marginLeft: 'auto',
    },
    avatarColour: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const useCRTStyles = makeStyles((theme) => ({
    badgeIcon: {
        // marginRight: theme.spacing(4),
    },
    container: {
        // margin: theme.spacing(0, 2, 0, 0),
        marginTop: theme.spacing(3),
    },
}));

const parseDate = (date) => {
    if (date === '' || !date) return '';
    try {
        const dateObj = new Date(date);
        return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
    } catch (err) {
        console.log('Date error', err);
        return '';
    }
};

const ContactsResumesTodos = (props) => {
    const { todosLength, resumesLength, contactsLength } = props;
    const classes = useCRTStyles();
    return (
        <Grid container direction="row" justify="space-evenly">
            <Badge badgeContent={todosLength} color="primary" className={classes.badgeIcon}>
                <AddAlertIcon />
            </Badge>
            <Badge badgeContent={resumesLength} color="primary" className={classes.badgeIcon}>
                <DescriptionIcon />
            </Badge>
            <Badge badgeContent={contactsLength} color="primary" className={classes.badgeIcon}>
                <ContactsIcon />
            </Badge>
        </Grid>
    );
};

const Application = (props) => {
    const classes = useStyles();
    const {
        _id,
        businessName,
        roleTitle,
        // requirementsNote,
        // notes,
        // postLink,
        dateFound,
        // foundWhereNote,
        haveApplied,
        appliedDate,
        interviewsArray,
        haveResearched,
        // haveResearchedNotes,
        resumes,
        contacts,
        todos,
        // createdAt,
    } = props.applicationData;

    const statusDate = parseDate(
        (interviewsArray.length > 0 && interviewsArray[0].date) || appliedDate || dateFound || ''
    );

    return (
        <Card className={classes.applicationCard}>
            <CardActionArea component={Link} to={'/applications/' + _id}>
                <CardHeader
                    avatar={<Avatar className={classes.avatarColour}>{businessName[0]}</Avatar>}
                    title={<Typography variant="subtitle1">{businessName}</Typography>}
                    subheader={
                        <>
                            <Typography variant="subtitle2">{roleTitle}</Typography>
                            {statusDate && (
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {statusDate}
                                </Typography>
                            )}
                            <StatusArray marginTop={true} {...{ haveApplied, haveResearched, interviewsArray }} />
                        </>
                    }
                />
                <CardContent>
                    <ContactsResumesTodos
                        todosLength={todos.length}
                        resumesLength={resumes.length}
                        contactsLength={contacts.length}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Application;
