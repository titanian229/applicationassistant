import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Navbar from './components/Navbar';

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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/"></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
