import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const LoadingOverlay = () => {
    const [globalStore] = useGlobalStore();
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={globalStore.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingOverlay;
