import React, { useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';
import {} from 'module';

const Logout = () => {
    const [globalStore, dispatch, {API, processServerResponse, handleLocalStorage}] = useGlobalStore();
    // TODO add more detail and colour to this page
    const logout = async () => {
        const serverResponse = await API.logout()
        processServerResponse(serverResponse)
        handleLocalStorage.clearLocal()
        dispatch({ do: 'logout' });
    }

    useEffect(() => {
        logout()
        //eslint-disable-next-line
    }, []);

    if (globalStore.isAuthenticated === false) return <Redirect to="/" />;

    return <div>Logging out</div>;
};

export default Logout;
