import React, { useState } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
// import { Redirect } from 'react-router';

import { Grid, Typography, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import ResponsiveSave from '../components/ResponsiveSave';
import SectionTitle from '../components/SectionTitle';

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

const initialValues = {
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

const Settings = (props) => {
    const [globalStore, dispatch, { API, processServerResponse, changeHandler, sendMessage }] = useGlobalStore();
    const [values, setValues] = useState(initialValues);
    const handleChange = changeHandler(values, setValues);
    const classes = useStyles();

    const validateFields = (name, password, password2) => {
        setValues({ ...values, errorPassword: false, errorName: false, errorPassword2: false });
        let errorName = false,
            errorPassword = false,
            errorPassword2 = false;
        // if (!password || !password2) {
        //     sendMessage('Password field is empty', { variant: 'error', key: 'missingpassword' });
        //     errorPassword = true;
        // }
        if (!(password === password2)) {
            sendMessage('Passwords do not match', { variant: 'error', key: 'passwordmatch' });
            errorPassword2 = true;
        }
        if (password && password.length < 8) {
            sendMessage('Password must be 8 characters or more', { variant: 'error', key: 'passwordlength' });
            errorPassword = true;
        }
        // if (!name) {
        //     sendMessage('Name field is empty', { variant: 'error', key: 'missingname' });
        //     errorName = true;
        // }
        if (!name && !password) {
            sendMessage('Nothing input to update', { variant: 'error', key: 'missingfields' });
            errorPassword = true;
            errorName = true;
        }
        setValues({ ...values, errorPassword, errorPassword2, errorName });
        return !errorName && !errorPassword && !errorPassword2;
    };

    const submitSave = async () => {
        const { name, password, password2 } = values;
        const validate = validateFields(name, password, password2);
        if (validate === false) {
            return;
        }
        let update = { name, password };
        if (!name) delete update.name;
        if (!password) delete update.password;
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.put('/user', update);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (!serverUp) return;

        if (serverResponse.user) {
            dispatch({ do: 'setUser', name: serverResponse.user.name });
            setValues(initialValues);
        }
    };

    return (
        <Grid container direction="column">
            <SectionTitle title="Settings" />
            <Typography variant="subtitle1" align="center">
                {globalStore.user.name && `Welcome ${globalStore.user.name}`}
                <br />
                Change your password or name
            </Typography>
            <form className={classes.formRoot} autoComplete="off">
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
                    {/* <TextField
                        className={classes.margin}
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email', 'text')}
                        error={values.errorEmail}
                        autoComplete="email"
                    /> */}
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
                            if (e.key === 'Enter') submitSave();
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
                    <ResponsiveSave onClick={submitSave} buttonText="Update" />
                </Grid>
            </form>
        </Grid>
    );
};

export default Settings;
