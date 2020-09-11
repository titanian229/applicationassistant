import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalStore } from '../GlobalStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [globalStore, dispatcher] = useGlobalStore();

    return (
        <Route
            {...rest}
            render={(props) =>
                globalStore.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { referrerURL: props.location, test: 'yes' } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
