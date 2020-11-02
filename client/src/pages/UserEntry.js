import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';

import LinkedInOAuthButton from '../components/LinkedInOAuthButton';

import clsx from 'clsx';

import {
    Grid,
    Typography,
    Tab as MuiTab,
    Tabs as MuiTabs,
    Paper,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TabItem from '../components/TabItem';
import ResponsiveSave from '../components/ResponsiveSave';

const Tabs = withStyles((theme) => ({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 42,
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))((props) => <MuiTabs centered {...props} TabIndicatorProps={{ children: <span /> }} />);

const Tab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.getContrastText(theme.palette.primary.light),
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <MuiTab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(8),
    },
    tabContainer: {
        backgroundColor: theme.palette.primary.light,
    },
    tabItemContainer: {
        padding: theme.spacing(2),
    },
    margin: {
        marginTop: theme.spacing(2),
    },
}));

const defaultValues = {
    tab: 0,
    email: '',
    password: '',
    password2: '',
    name: '',
    showPassword: false,
    errorEmail: false,
    errorPassword: false,
    errorPassword2: false,
    errorName: false,
};

const UserEntry = (props) => {
    const classes = useStyles();
    const [
        globalStore,
        dispatch,
        {
            API,
            processServerResponse,
            changeHandler,
            handleLocalStorage: { clearLocal, saveToLocal },
            sendMessage,
        },
    ] = useGlobalStore();
    const [values, setValues] = useState(defaultValues);
    const referrer = props.location.state ? props.location.state.referrer || '/applications' : '/applications';

    const handleChange = changeHandler(values, setValues);

    // useEffect(() => {
    //     if (props.location.state) {
    //         if (props.location.state.referrerURL) {
    //             dispatch({ do: 'setReferrer', referrer: props.location.state.referrerURL.pathname });
    //         }
    //     }
    // }, [props.location.state]);

    const checkIsAuthenticated = async () => {
        const serverResponse = await API.checkAuthenticated();
        const serverUp = processServerResponse(serverResponse);

        const { isAuthenticated } = serverResponse;
        if (isAuthenticated === true) {
            // clearLocal();
            dispatch({ do: 'login', name: serverResponse.name });
        }
    };

    useEffect(() => {
        checkIsAuthenticated();
    }, []);

    // TODO implement grabbing stored settings from server for this user

    const validateLoginFields = (email, password) => {
        console.log('validate called', email, password);
        setValues({ ...values, errorEmail: false, errorPassword: false });
        let errorEmail = false,
            errorPassword = false;
        if (!email) {
            sendMessage('Email field is empty', { variant: 'error', key: 'missingemail' });
            errorEmail = true;
        }
        if (!password) {
            sendMessage('Password field is empty', { variant: 'error', key: 'missingpassword' });
            errorPassword = true;
        }
        setValues({ ...values, errorEmail, errorPassword });
        return !errorEmail && !errorPassword;
    };

    const submitLogin = async () => {
        const { email, password } = values;
        const validate = validateLoginFields(email, password);
        if (validate === false) {
            return;
        }
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.post('/login', { email, password });
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.session) {
            saveToLocal('session', serverResponse.session);
            dispatch({ do: 'login', name: serverResponse.name });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitLogin();
    };

    const validateRegisterFields = (name, email, password, password2) => {
        setValues({ ...values, errorEmail: false, errorPassword: false, errorName: false, errorPassword2: false });
        let errorEmail = false,
            errorName = false,
            errorPassword = false,
            errorPassword2 = false;
        if (!email) {
            sendMessage('Email field is empty', { variant: 'error', key: 'missingemail' });
            errorEmail = true;
        }
        if (!password || !password2) {
            sendMessage('Password field is empty', { variant: 'error', key: 'missingpassword' });
            errorPassword = true;
        }
        if (!(password === password2)) {
            sendMessage('Passwords do not match', { variant: 'error', key: 'passwordmatch' });
            errorPassword2 = true;
        }
        if (password.length < 8) {
            sendMessage('Password must be 8 characters or more', { variant: 'error', key: 'passwordlength' });
            errorPassword = true;
        }
        if (!name) {
            sendMessage('Name field is empty', { variant: 'error', key: 'missingname' });
            errorName = true;
        }
        setValues({ ...values, errorEmail, errorPassword, errorPassword2, errorName });
        return !errorEmail && !errorPassword && !errorName && !errorPassword2;
    };

    const submitRegister = async () => {
        const { name, email, password, password2 } = values;
        const validate = validateRegisterFields(name, email, password, password2);
        if (validate === false) {
            return;
        }
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.post('/register', { name, email, password });
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.session) {
            saveToLocal('session', serverResponse.session);
            dispatch({ do: 'login', name: serverResponse.name });
        }
    };

    const handleRegister = (event) => {
        event.preventDefault();
        submitRegister();
    };

    const oAuthloginComplete = (returnedData) => {
        const serverUp = processServerResponse(returnedData);
        if (serverUp === false) return;

        if (returnedData.session) {
            saveToLocal('session', returnedData.session);
            console.log('returnedData', returnedData)
            console.log("Linkedin worked")
            dispatch({ do: 'login', name: returnedData.name });
        }
    };

    if (globalStore.isAuthenticated) return <Redirect to={referrer} />;

    return (
        <Grid className={classes.container} container direction="column" justify="center" alignItems="center">
            <Paper elevation={3} className={clsx(classes.tabContainer)}>
                <Tabs value={values.tab} onChange={handleChange('tab', 'tab')} aria-label="login registration tabs">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <TabItem tab={0} currentTab={values.tab}>
                    <form className={classes.formRoot} autoComplete="on">
                        <Grid className={classes.tabItemContainer} container direction="column">
                            <TextField
                                className={classes.margin}
                                label="Email"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange('email', 'text')}
                                error={values.errorEmail}
                                autoComplete="email"
                            />
                            <TextField
                                className={classes.margin}
                                type={values.showPassword ? 'text' : 'password'}
                                label="Password"
                                variant="outlined"
                                value={values.password}
                                error={values.errorPassword2}
                                onChange={handleChange('password', 'text')}
                                autoComplete="password"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitLogin();
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleChange('showPassword', 'boolean')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <Button className={classes.margin} onClick={handleSubmit}>
                                Submit
                            </Button> */}
                            <ResponsiveSave onClick={handleSubmit} buttonText="Submit" />
                            <LinkedInOAuthButton loginComplete={oAuthloginComplete} />
                        </Grid>
                    </form>
                </TabItem>
                <TabItem tab={1} currentTab={values.tab}>
                    <form className={classes.formRoot} autoComplete="on">
                        <Grid className={classes.tabItemContainer} container direction="column">
                            <TextField
                                className={classes.margin}
                                label="Name"
                                variant="outlined"
                                value={values.name}
                                onChange={handleChange('name', 'text')}
                                error={values.errorName}
                                autoComplete="name"
                            />
                            <TextField
                                className={classes.margin}
                                label="Email"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange('email', 'text')}
                                error={values.errorEmail}
                                autoComplete="email"
                            />
                            <TextField
                                className={classes.margin}
                                type={values.showPassword ? 'text' : 'password'}
                                label="Password"
                                variant="outlined"
                                value={values.password}
                                error={values.errorPassword}
                                onChange={handleChange('password', 'text')}
                                autoComplete="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleChange('showPassword', 'boolean')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.margin}
                                type={values.showPassword ? 'text' : 'password'}
                                label="Password"
                                variant="outlined"
                                value={values.password2}
                                error={values.errorPassword2}
                                onChange={handleChange('password2', 'text')}
                                autoComplete="password"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitRegister();
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleChange('showPassword', 'boolean')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <ResponsiveSave onClick={handleRegister} buttonText="Register" />
                        </Grid>
                    </form>
                </TabItem>
            </Paper>
        </Grid>
    );
};

export default UserEntry;
