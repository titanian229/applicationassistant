import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../components/GlobalStore';

import sideOneImage from './images/jess-bailey-q10VITrVYUM-unsplash.jpg';
import sideTwoImage from './images/cookie-the-pom-gySMaocSdqs-unsplash.jpg';

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
    searchOne: {},
    sideOneImage: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    sideTwoImage: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    aboutContainer: {
        // width: '100%',
        borderRadius: '5px',
        padding: '20px',
        borderStyle: 'solid',
        borderWidth: '4px',
        borderColor: theme.palette.secondary.main,
        // border: "4px solid "
    },
    aboutContainerMargin: {
        margin: theme.spacing(4, 0),
    },
}));

const Home = () => {
    const [globalStore] = useGlobalStore();
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
            <Grid container spacing={3} alignItems="center" justify="center" className={classes.bodyContainer}>
                <Grid item md={6}>
                    <Typography variant="body1" className={classes.body}>
                        Hunting for a new job is hard. There are so many things to keep track of, contact information,
                        details of how your interviews have gone, salaries, the list is endless. Application Assistant
                        helps you keep track of all that in a central location. You can track your employment
                        opportunities, networking contacts, todos and reminders on actions you need to take, store the
                        resume versions for each application, every piece of data you need to track. Application
                        Assistant is here to make the search easier for you so you can spend your time where it counts.
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <img src={sideOneImage} className={classes.sideOneImage} alt="Work" />
                </Grid>
                <Grid item md={6}>
                    <img src={sideTwoImage} className={classes.sideTwoImage} alt="Hard at work" />
                </Grid>
                <Grid item md={6}>
                    <Typography variant="subtitle1" className={classes.margin}>
                        Key Features
                    </Typography>
                    <Typography variant="body2" className={classes.body} component="div">
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
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container justify="center" className={classes.aboutContainerMargin}>
                <Box alignItems="center" justify="center" className={classes.aboutContainer} bgcolor="primary.main">
                    <Typography variant="subtitle1">About Application Assistant</Typography>
                    <Typography variant="body2" className={classes.body}>
                        Application Assistant was created by James Lee, a full stack developer and avid automator from
                        Toronto, Ontario. Learn more about James and see more of his projects on his{' '}
                        <a href="https://jamesdeveloping.ca" target="_blank" rel="noreferrer noopener">
                            personal webpage
                        </a>
                        . Application Assistant uses a back-end NodeJS environment running an Express server, and a
                        ReactJS front-end using Material-UI components. See Application Assistant's source on GitHub{' '}
                        <a
                            href="https://github.com/titanian229/applicationassistant/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            here
                        </a>
                        .
                    </Typography>
                </Box>
            </Grid>
        </div>
    );
};

export default Home;
