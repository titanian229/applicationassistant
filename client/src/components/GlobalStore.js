//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer, createContext } from 'react';

const defaultGlobalStore = {
    message: {text: '', type: ''},
    messageDuration: 5000,
    user: '',
    session: '',
    loggedIn: false,
    theme: 'light',


};

const GlobalData = createContext();

function dispatcher(state, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.do) {
        case 'displayMessage':
            if (!action.message){
                console.log('message dispatch called with no message')
                return state
            }
            newState.message.type = action.message.type || 'info';
            newState.message.text = action.message.text;
            return newState;
        case 'clearMessage':
            newState.message = defaultGlobalStore.message;
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
