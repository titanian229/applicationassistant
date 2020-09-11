import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';
import {} from 'module';

const Logout = (props) => {
    const [globalStore, dispatch] = useGlobalStore();

    useEffect(() => {
        dispatch({ do: 'logout' });
    }, []);

    if (globalStore.isAuthenticated === false) return <Redirect to="/" />;

    return <div>Logging out</div>;
};

export default Logout;
