import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Slide,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CloseIcon from '@material-ui/icons/Close';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactView from '../ContactView';

import InputField from '../InputField';
import ConfirmationButtons from '../ConfirmationButtons';

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
    const { open, contact, onClose, handleEdit, deleteContact, handleDissociate } = props;
    const [, dispatch, { processServerResponse, sendMessage, API, confirmAction }] = useGlobalStore();
    const classes = useStyles();

    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        if (!contact) return;
        if (contact._id) {
            setValues({ ...values, ...contact });
        }
    }, [contact]);

    const { name, roleTitle, businessName, contactMethods, notes, associatedTodos } = values;

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
        onClose()
        deleteContact(contact._id)
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

            {/* <DialogTitle id="contact-dialog">{name}</DialogTitle> */}
            {/* <DialogContent>
                <DialogContentText>Add a contact to link to this application</DialogContentText>
                <Grid container direction="column"></Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions> */}
        </Dialog>
    );
};

export default ContactViewDialog;
