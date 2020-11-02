import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../components/GlobalStore';

const useStyles = makeStyles((theme) => ({
    hero: {
        height: 400,
        backgroundImage: 'url(./images/nasa-Q1p7bh3SHj8-unsplash.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(-1),
        marginTop: theme.spacing(-1),
        borderStyle: 'solid',
        borderWidth: '0 0 12px 0',
        borderColor: theme.palette.primary.main,
    },
    heroText: {
        color: '#fff',
    },
    heroTextContainer: {
        position: 'absolute',
        left: '20%',
        top: '20%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            left: '10%',
        },
    },
    highlight: {
        color: theme.palette.primary.main,
    },
    bodyContainer: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(3),
        // backgroundColor: 'black'
    },
    body: {
        // color: '#fff',
        maxWidth: '60ch',
    },
    margin: {
        marginTop: theme.spacing(3),
    },
}));

const Home = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.hero}>
                <Box className={classes.heroTextContainer}>
                    <Typography variant="h6" className={classes.heroText}>
                        Welcome to <span className={classes.highlight}>Application Assistant</span>{' '}
                        {globalStore.user.name && globalStore.user.name}
                    </Typography>
                    {!globalStore.isAuthenticated && (
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Register
                        </Button>
                    )}
                    {globalStore.isAuthenticated && (
                        <Button variant="contained" color="primary" component={Link} to="/applications">
                            See My Applications
                        </Button>
                    )}
                </Box>
            </Box>
            <Box className={classes.bodyContainer}>
                <Typography variant="body1" className={classes.body}>
                    Hunting for a new job is hard. There are so many things to keep track of, contact information,
                    details of how your interviews have gone, salaries, the list is endless. Application Assistant helps
                    you keep track of all that in a central location. You can track your employment opportunities,
                    networking contacts, todos and reminders on actions you need to take, store the resume versions for
                    each application, every piece of data you need to track. Application Assistant is here to make the
                    search easier for you so you can spend your time where it counts.
                </Typography>
                <Typography variant="subtitle1" className={classes.margin}>
                    Key Features
                </Typography>
                <Typography variant="body2" className={classes.body} component='div'>
                    <ul>
                        <li>
                            Save opportunities you've found with links to posts and all the key information such as
                            requirements and salary
                        </li>
                        <li>Add networking contacts and keep contacts saved with each application</li>
                        <li>Add todos and reminders, view with each application or unified together</li>
                        <li>Save versions of resumes and cover letters with each application</li>
                        <li>Store information about each interview you go through</li>
                        <li>Save job offers as you get them, and compare all your opportunities</li>
                    </ul>
                </Typography>
            </Box>
        </div>
    );
};

export default Home;
