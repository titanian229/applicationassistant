import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: '1em',
    },
    welcomeMessage: {
        margin: '1em 0',
    },
}));

const NewUser = () => {
    // Greeting for new user if no applications present, explaining how to use application
    // USAGE => What it's for, what each page is, how to make a new application,
    // button to create a new application
    const classes = useStyles()

    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Welcome to Application Assistant!
            </Typography>
            <Typography variant="body1" className={classes.welcomeMessage}>
                This page is for saving new applications and viewing the applications you've already saved. Save all the
                relevant information, keep track of ongoing and past applications, and see your journey so far.
            </Typography>
            <Button component={Link} variant="contained" color="primary" to="/newapplication">
                Save your first application
            </Button>
        </>
    );
};

export default NewUser;
