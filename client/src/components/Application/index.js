import React from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Avatar,
    IconButton,
    Button,
    Chip,
    Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import WorkIcon from '@material-ui/icons/WorkTwoTone';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import StatusArray from '../StatusArray'

import clsx from 'clsx';

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

// const useStatusArrayStyles = makeStyles((theme) => ({
//     chip: {
//         marginRight: theme.spacing(1),
//     },
//     statusArray: {
//         width: '100%',
//         marginTop: theme.spacing(1),
//         // paddingTop: theme.spacing(1),
//         // paddingBottom: theme.spacing(1),
//         // padding: theme.spacing(1),
//         // marginTop: theme.spacing(2),
//     },
// }));

// const StatusArray = (props) => {
//     const { haveApplied, haveResearched, interviewsArray } = props;
//     const classes = useStatusArrayStyles();
//     if (!(haveApplied || haveResearched || interviewsArray.length > 0)) return '';

//     return (
//         <div className={classes.statusArray}>
//             {haveApplied && (
//                 <Chip className={classes.chip} variant="outlined" color="primary" size="small" label="Applied" />
//             )}
//             {haveResearched && (
//                 <Chip className={classes.chip} variant="outlined" color="primary" size="small" label="Researched" />
//             )}
//             {interviewsArray.length > 0 && (
//                 <Chip className={classes.chip} variant="outlined" color="primary" size="small" label="Interviewed" />
//             )}
//         </div>
//     );
// };

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
        requirementsNote,
        notes,
        postLink,
        dateFound,
        foundWhereNote,
        haveApplied,
        appliedDate,
        interviewsArray,
        haveResearched,
        haveResearchedNotes,
        resumes,
        contacts,
        todos,
        createdAt,
    } = props.applicationData;

    const statusDate = parseDate(
        (interviewsArray.length > 0 && interviewsArray[0].date) || appliedDate || dateFound || ''
    );

    return (
        <Card className={classes.applicationCard}>
            <CardActionArea component={Link} to={'/applications/' + _id}>
                <CardHeader
                    avatar={<Avatar className={classes.avatarColour}>{businessName[0]}</Avatar>}
                    // action={
                    //     <IconButton aria-label="options">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
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
                    {/* {postLink && (
                        <Typography className={classes.cardContent} variant="body2" color="textSecondary" component="p">
                            <a href={postLink}>Link</a>
                        </Typography>
                    )} */}
                    {/* Next Step: */}
                    {/* <StatusArray
                        statusArrayClass={classes.statusArray}
                        {...{ haveApplied, haveResearched, interviewsArray }}
                    /> */}
                    <ContactsResumesTodos
                        todosLength={todos.length}
                        resumesLength={resumes.length}
                        contactsLength={contacts.length}
                    />
                </CardContent>
            </CardActionArea>
            {/* <CardActions disableSpacing> */}
            {/* <Button>View/Edit</Button> */}
            {/* <IconButton className={classes.rightIcon}>
                    <FavoriteIcon />
                </IconButton> */}
            {/* <IconButton>
                    <ContactsIcon />
                </IconButton>
                <IconButton>
                    <DescriptionIcon />
                </IconButton>
                <IconButton>
                    <AddAlertIcon />
                </IconButton> */}
            {/* </CardActions> */}
        </Card>
    );
};

export default Application;
