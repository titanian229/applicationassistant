import React from 'react';
import {Link} from 'react-router-dom'
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';

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
    statusArray: {
        width: '100%',
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        // padding: theme.spacing(1),
        // marginTop: theme.spacing(2),
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

const parseDate = (date) => date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

const Application = (props) => {
    const classes = useStyles();
    const {
        _id,
        businessName,
        roleTitle,
        requirementsNote,
        postLink,
        dateFound,
        foundWhereNote,
        haveApplied,
        appliedDate,
        interviewsArray,
        haveResearched,
        haveResearchedNotes,
        haveResearchedTodosArray,
        associatedResumesArray,
        associatedContactsArray,
        associatedTodosRemindersArray,
    } = props.applicationData;

    const statusArray = (
        <div className={classes.statusArray}>
            {haveApplied && <Chip variant="outlined" color="primary" size="small" label="Applied" />}
            {haveResearched && <Chip variant="outlined" color="primary" size="small" label="Researched" />}
            {interviewsArray.length > 0 && <Chip variant="outlined" color="primary" size="small" label="Interviewed" />}
        </div>
    );

    const statusDate = (interviewsArray.length > 0 && interviewsArray[0].date) || appliedDate || dateFound || '';

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
                                    {parseDate(statusDate)}
                                </Typography>
                            )}
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
                    {statusArray}
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
