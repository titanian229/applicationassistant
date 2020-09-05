import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Dialog,
    // DialogTitle,
    // DialogActions,
    // DialogContent,
    // DialogContentText,
    // Button,
    Grid,
    IconButton,
    // InputAdornment,
    // TextField,
    // List,
    // ListItem,
    // ListItemText,
    // ListItemIcon,
    // Avatar,
    // ListItemAvatar,
    // ListItemSecondaryAction,
    // FormControl,
    // Select,
    // InputLabel,
    // MenuItem,
    Slide,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ContactView from '../ContactView';


// import changeHandler from '../../utils/handleChange';
// import API from '../../utils/API';
import { useGlobalStore } from '../GlobalStore';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    mainContainer: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(9),
        },
    },
}));

const defaultValues = {
    name: '',
    roleTitle: '',
    businessName: '',
    contactMethods: [],
    notes: '',
    associatedTodos: '',
};

const ContactViewDialog = (props) => {
    const { open, contact, onClose, handleEdit, deleteContact } = props;  //handleDissociate is also passed in
    const [, , { confirmAction }] = useGlobalStore();
    const classes = useStyles();

    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        if (!contact) return;
        if (contact._id) {
            setValues({ ...defaultValues, ...contact });
        }
    }, [contact]);

    const { name } = values;

    const handleCloseAndFunction = (handleFunction) => {
        if (handleFunction) {
            return () => {
                console.log('function called', contact);
                onClose();
                handleFunction(contact);
            };
        }
    };

    const handleDelete = () => {
        deleteContact(contact._id)
        onClose()
    };

    const handleClose = () => {
        setValues(defaultValues);
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            aria-labelledby="contact-dialog"
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" align="center" className={classes.title}>
                        {name}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.mainContainer}>
                <Grid container direction="column">
                    <ContactView
                        contact={values}
                        handleEdit={handleCloseAndFunction(handleEdit)}
                        handleDelete={
                            deleteContact
                                ? confirmAction(handleDelete, {
                                      text: 'Permanently delete contact?',
                                      confirmText: 'Delete',
                                  })
                                : null
                        }
                        // handleDissociate={handleCloseAndFunction(handleDissociate)}
                    />
                </Grid>
            </div>
        </Dialog>
    );
};

export default ContactViewDialog;
