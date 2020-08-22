import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Navbar from './components/Navbar';

import Applications from './pages/Applications';
import Application from './pages/Application'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#820263',
        },
        secondary: {
            main: '#198203',
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
        paddingTop: theme.spacing(7)
    },
}))

function App() {
    const classes = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.mainContainer}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/applications">
                            <Applications />
                        </Route>
                        <Route path='/applications/:id'>
                            <Application />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
