import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';
import {} from 'module';

const Logout = (props) => {
    const [globalStore, dispatch, {API, processServerResponse, handleLocalStorage}] = useGlobalStore();

    const logout = async () => {
        const serverResponse = await API.logout()
        processServerResponse(serverResponse)
        handleLocalStorage.clearLocal()
        dispatch({ do: 'logout' });
    }

    useEffect(() => {
        logout()
    }, []);

    if (globalStore.isAuthenticated === false) return <Redirect to="/" />;

    return <div>Logging out</div>;
};

export default Logout;
