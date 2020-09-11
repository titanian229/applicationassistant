import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';

const UserEntry = (props) => {
    const [globalStore, dispatch] = useGlobalStore();

    useEffect(() => {
        if (props.location.state.referrerURL) {
            dispatch({ do: 'setReferrer', referrer: props.location.state.referrerURL.pathname });
        }
    }, [props.location.state]);

    const handleLogin = () => {
        console.log('login clicked')
        dispatch({ do: 'login' });
    };

    if (globalStore.isAuthenticated) return <Redirect to={globalStore.referrer || '/applications'} />;

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default UserEntry;
