import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Typography,
    Grid,
    Paper,
    Box,
    Divider,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Tabs,
    Tab,
    List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import AssetActionsPanel from '../AssetActionsPanel';

// import ContactMethod from './ContactMethod'
import MethodDisplay from '../ContactNew/MethodDisplay';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        position: 'relative',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        width: '100vw',
        height: '100%',
        // backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(-1),
        padding: theme.spacing(1, 3),
    },
    bg: {
        backgroundColor: theme.palette.secondary.light,
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    header: {
        width: 340,
        // outline: '1px solid blue',
        zIndex: 2,
    },
    main: {
        position: 'relative',
        top: -40,
        paddingTop: 40,
        width: '100%',
        height: '100%',
        // minHeight: '80vh',
        // padding: theme.spacing(1),
        // outline: '1px solid red',
    },
    section: {
        marginTop: theme.spacing(1),
    },
    central: {
        padding: theme.spacing(0, 2),
    },
    title: {
        color: theme.palette.primary.dark,
    },
    subtitle: {
        color: theme.palette.secondary.dark,
    },
    subtitle2: {
        color: theme.palette.secondary.light,
    },
    tabRoot: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
    tabIndicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
}));

const ContactView = (props) => {
    const { handleDelete, handleEdit, handleDissociate } = props;
    const { name, roleTitle, businessName, contactMethods, notes, associatedTodos } = props.contact;
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
            <div className={classes.bg} />
            <Paper elevation={12} className={classes.header}>
                <Typography variant="h4" align="center" className={classes.title}>
                    {name}
                </Typography>
                {businessName && (
                    <Typography variant="h5" align="center" className={classes.subtitle}>
                        {businessName}
                    </Typography>
                )}
                {roleTitle && (
                    <Typography variant="h6" align="center" className={classes.subtitle2}>
                        {roleTitle}
                    </Typography>
                )}
            </Paper>
            <Paper elevation={4} className={classes.main}>
                <Box padding={2}>
                    <Grid container spacing={3}>
                        <AssetActionsPanel
                            {...{ handleDelete, handleEdit, handleDissociate }}
                            asset={props.contact}
                        />
                        <Box className={classes.central}>
                            <List dense>
                                {contactMethods.map((method, index) => (
                                    <MethodDisplay key={index} {...method} />
                                ))}
                            </List>
                            {notes && (
                                <Box className={classes.section}>
                                    <Typography variant="subtitle2">Notes:</Typography>
                                    <Typography variant="body2">{notes}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ContactView;
