//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer, createContext } from 'react';
import processServerResponse from '../utils/processServerResponse';
import { useSnackbar } from 'notistack';

const defaultGlobalStore = {
    message: { text: '', type: '' },
    messageDuration: 5000,
    user: '',
    session: '',
    loggedIn: false,
    theme: 'light',
    loading: false,
};

let previousMessage = { text: '', time: undefined };

const GlobalData = createContext();

function dispatcher(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.do) {
        case 'displayMessage':
            if (!action.message) {
                console.log('message dispatch called with no message');
                return state;
            }
            previousMessage = { text: action.message.text, time: Date.now() };
            newState.message.type = action.message.type || 'info';
            newState.message.text = action.message.text;
            return newState;
        case 'clearMessage':
            console.log('clearing message');
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
        case 'login':
            newState.loggedIn = true;
            return newState;
        case 'logout':
            return defaultGlobalStore;
        default:
            console.log(`unknown action called from GlobalStore: ${action.do}`);
            break;
    }
}

const sharedFunctions = {
    processServerResponse,
};

const formatMessage = (message, variant) => {
    return { message, options: { key: message, variant } };
};

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher, defaultGlobalStore);
    const { enqueueSnackbar } = useSnackbar();

    const processServerResponse = (serverResponse) => {
        if (!serverResponse) {
            const { message, options } = formatMessage('The server is not responding', 'error');
            enqueueSnackbar(message, options);
            return;
        }
        if (serverResponse.error) {
            const { message, options } = formatMessage(serverResponse.error, 'error');
            enqueueSnackbar(message, options);
            return;
        }
        if (serverResponse.message) {
            const { message, options } = formatMessage(serverResponse.message, serverResponse.messageType || 'success');
            enqueueSnackbar(message, options);
            return;
        }
        console.log('Error within processServerResponse');
        return 'Error';
    };

    return (
        <GlobalData.Provider
            value={[globalData, dispatch, { sendMessage: enqueueSnackbar, processServerResponse }]}
            {...props}
        />
    );
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };
