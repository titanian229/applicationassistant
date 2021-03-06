import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import './global.css'

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { orange, deepPurple } from '@material-ui/core/colors/';

import { SnackbarProvider } from 'notistack';

import Applications from './pages/Applications';
import Application from './pages/Application';
import NewApplication from './pages/NewApplication';
import Contacts from './pages/Contacts';
import Contact from './pages/Contact';
import Resumes from './pages/Resumes';
import Todos from './pages/Todos';
import Message from './components/Message';
import Home from './pages/Home';
import ConfirmationDialog from './components/ConfirmationDialog';
import { GlobalStore } from './components/GlobalStore';
import PrivateRoute from './components/PrivateRoute';
import UserEntry from './pages/UserEntry';
import Logout from './pages/Logout';
import Settings from './pages/Settings';

// primary: {
//     main: '#820263',
//     light: '#CC9BC0',
// },
// secondary: {
//     main: '#198203',
//     light: '#BFFFB3',
// },

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
            light: orange[300],
            dark: orange[700],
        },
        secondary: {
            main: deepPurple[300],
            light: deepPurple[100],
            dark: deepPurple[500],
        },
    },
    // breakpoints: {
    //     values: {
    //         xs: 0,
    //         sm: 700,
    //         md: 960,
    //         lg: 1280,
    //         xl: 1920,
    //     },
    // },
    typography: {
        fontFamily: ['Open Sans', 'Helvetica', 'sans-serif'].join(','),
        h1: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        h2: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        h3: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        h4: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        h5: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        h6: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontStyle: 'italic',
        },
        subtitle1: {
            fontFamily: 'Fira Sans Extra Condensed',
            // fontWeight: ,
            // fontStyle: 'italic',
        },
        subtitle2: {
            fontFamily: 'Fira Sans Extra Condensed',
            // fontWeight: ,
            // fontStyle: 'italic',
        },
        // body1
        // body2
        // button
        // caption
        // overline
    },
});

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        paddingBottom: theme.spacing(6),
        paddingTop: theme.spacing(8),
        // [theme.breakpoints.down('sm')]: {
        // },
        // [theme.breakpoints.up('sm')]: {
        //     paddingTop: theme.spacing(7),
        // },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '80vw',
            margin: '0 auto',
        },
    },
    wrapper: {
        minHeight: '100vh',
        position: 'relative'
    }
}));

function App() {
    const classes = useStyles();
    // TODO add a back button to return to previous page
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <GlobalStore>
                    <div className={classes.wrapper}>
                        <div className={classes.mainContainer}>
                            <ConfirmationDialog />
                            <Router>
                                <Navbar />
                                <Message />
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/login" component={UserEntry} />
                                    <Route exact path="/logout" component={Logout} />
                                    <PrivateRoute exact path="/applications" component={Applications} />
                                    <PrivateRoute path="/applications/:id" component={Application} />
                                    <PrivateRoute exact path="/newapplication" component={NewApplication} />
                                    <PrivateRoute exact path="/editapplication/:id" component={NewApplication} />
                                    <PrivateRoute exact path="/contacts" component={Contacts} />
                                    <PrivateRoute path="/contacts/:id" component={Contact} />
                                    <PrivateRoute exact path="/resumes" component={Resumes} />
                                    <PrivateRoute path="/todos/:filter" component={Todos} />
                                    <PrivateRoute exact path="/todos/" component={Todos} />
                                    <PrivateRoute exact path="/settings" component={Settings} />
                                </Switch>
                            </Router>
                        </div>
                        <Footer />
                    </div>
                </GlobalStore>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
