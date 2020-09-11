//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer, createContext } from 'react';
// import processServerResponse from '../utils/processServerResponse';
import { useSnackbar } from 'notistack';

import { handleChange as changeHandler, formatDate, API, keyCatcher } from '../utils';

const defaultConfirmationDialog = {
    open: false,
    handleConfirm: () => console.log('No confirm action defined'),
    text: '',
    confirmText: '',
};

const defaultGlobalStore = {
    message: { text: '', type: '' },
    messageDuration: 5000,
    user: '',
    session: '',
    isAuthenticated: false,
    referrer: null,
    theme: 'light',
    loading: false,
    confirmationDialog: defaultConfirmationDialog,
};

// let previousMessage = { text: '', time: undefined };

const GlobalData = createContext();

function dispatcher(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.do) {
        case 'displayMessage':
            if (!action.message) {
                console.log('message dispatch called with no message');
                return state;
            }
            // previousMessage = { text: action.message.text, time: Date.now() };
            newState.message.type = action.message.type || 'info';
            newState.message.text = action.message.text;
            return newState;
        case 'clearMessage':
            newState.message = defaultGlobalStore.message;
            return newState;
        case 'processServerResponse':
            if (!action.serverResponse) {
                newState.message.type = 'error';
                newState.message.text = 'There was no response from the server';
                return newState;
            }
            if (action.serverResponse.message) {
                newState.message.type = 'success';
                newState.message.text = action.serverResponse.message;
                return newState;
            }
            if (action.serverResponse.error) {
                newState.message.type = 'error';
                newState.message.text = action.serverResponse.error;
                return newState;
            }
            if (action.serverResponse.info) {
                newState.message.type = 'info';
                newState.message.text = action.serverResponse.info;
                return newState;
            }
            console.log('Server response unknown', action.serverResponse);

            return newState;
        case 'setLoading':
            newState.loading = action.loading;
            return newState;
        case 'showConfirmation':
            newState.confirmationDialog = {
                open: true,
                ...action,
            };
            return newState;
        case 'closeConfirmation':
            newState.confirmationDialog = defaultConfirmationDialog;
            return newState;
        case 'setReferrer':
            newState.referrer = action.referrer
            return newState
        case 'login':
            newState.isAuthenticated = true;
            return newState;
        case 'logout':
            return defaultGlobalStore;
        default:
            console.log(`unknown action called from GlobalStore: ${action.do}`);
            return newState;
    }
}

const sharedFunctions = {
    formatDate,
    changeHandler,
    API,
    keyCatcher,
};

const formatMessage = (message, variant) => {
    return { message, options: { key: message, variant } };
};

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher, defaultGlobalStore);
    const { enqueueSnackbar } = useSnackbar();

    const processServerResponse = (serverResponse) => {
        console.log('processServerResponse -> serverResponse', serverResponse);
        if (!serverResponse) {
            const { message, options } = formatMessage('The server is not responding', 'error');
            enqueueSnackbar(message, options);
            return false;
        }
        if (serverResponse.error) {
            const { message, options } = formatMessage(serverResponse.error, 'error');
            enqueueSnackbar(message, options);
            return true;
        }
        if (serverResponse.message) {
            const { message, options } = formatMessage(serverResponse.message, serverResponse.messageType || 'success');
            enqueueSnackbar(message, options);
            return true;
        }
    };

    const loadResource = async (APIFunction, resourceName, stateSetter, showLoading = true) => {
        if (showLoading) dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await APIFunction();
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        if (serverResponse[resourceName]) {
            stateSetter(serverResponse[resourceName]);
        }
    };

    const confirmAction = (handleConfirm, dialogDetails) => () => {
        dispatch({ do: 'showConfirmation', handleConfirm, ...dialogDetails });
    };

    return (
        <GlobalData.Provider
            value={[
                globalData,
                dispatch,
                {
                    sendMessage: enqueueSnackbar,
                    processServerResponse,
                    loadResource,
                    confirmAction,
                    ...sharedFunctions,
                },
            ]}
            {...props}
        />
    );
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };
