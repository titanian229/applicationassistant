import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { Redirect } from 'react-router';

const UserEntry = (props) => {
    const [globalStore, dispatch] = useGlobalStore();

    const referrer = props.location.state ? props.location.state.referrer || '/applications' : '/applications'

    // useEffect(() => {
    //     if (props.location.state) {
    //         if (props.location.state.referrerURL) {
    //             dispatch({ do: 'setReferrer', referrer: props.location.state.referrerURL.pathname });
    //         }
    //     }
    // }, [props.location.state]);

    // TODO implement grabbing stored settings from server for this user

    const handleLogin = () => {
        console.log('login clicked');
        dispatch({ do: 'login' });
    };

    if (globalStore.isAuthenticated) return <Redirect to={referrer} />;

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default UserEntry;
