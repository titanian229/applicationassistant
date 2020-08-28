import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {useGlobalStore} from '../GlobalStore'

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     alignItems: 'center',
    // },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ResponsiveSave = (props) => {
    const classes = useStyles();
    const [globalStore] = useGlobalStore()
    const {onClick} = props

    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                // className={buttonClassname}
                disabled={globalStore.loading}
                onClick={onClick}
            >
                Save
            </Button>
            {globalStore.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
};

export default ResponsiveSave;
