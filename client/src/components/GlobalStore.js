//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer, createContext } from 'react';

const defaultGlobalStore = {
    message: { text: '', type: '' },
    messageDuration: 5000,
    user: '',
    session: '',
    loggedIn: false,
    theme: 'light',
    loading: false,
};

const GlobalData = createContext();

function dispatcher(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.do) {
        case 'displayMessage':
            if (!action.message) {
                console.log('message dispatch called with no message');
                return state;
            }
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

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher, defaultGlobalStore);

    return <GlobalData.Provider value={[globalData, dispatch]} {...props} />;
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };
