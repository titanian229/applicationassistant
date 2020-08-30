import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStatusArrayStyles = makeStyles((theme) => ({
    chip: {
        // marginRight: theme.spacing(1),
        // marginTop: theme.spacing(1),
        // fontSize: 10,
    },
    statusArray: {
        width: '100%',
        // marginTop: theme.spacing(1),
        // outline: '1px solid blue'
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        // padding: theme.spacing(1),
        // marginTop: theme.spacing(2),
    },
    chipLabel: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        fontSize: 11,
        // color: 'red'
    },
    marginTop: {
        marginTop: '1px',
    },
}));

const StatusArray = (props) => {
    const { haveApplied, haveResearched, interviewsArray, marginTop = false } = props;
    const classes = useStatusArrayStyles();
    if (!(haveApplied || haveResearched || interviewsArray.length > 0)) return '';

    return (
        <Grid container wrap="wrap" spacing={1} className={clsx(classes.statusArray, marginTop && classes.marginTop)}>
            {haveApplied && (
                <Grid item>
                    <Chip
                        className={classes.chip}
                        classes={{ label: classes.chipLabel }}
                        color="primary"
                        size="small"
                        label="Applied"
                    />
                </Grid>
            )}
            {haveResearched && (
                <Grid item>
                    <Chip
                        className={classes.chip}
                        classes={{ label: classes.chipLabel }}
                        color="primary"
                        size="small"
                        label="Researched"
                    />

                    {/* <Chip className={classes.chip} variant="outlined" color="primary" size="small" label="Researched" /> */}
                </Grid>
            )}
            {interviewsArray.length > 0 && (
                <Grid item>
                    <Chip
                        className={classes.chip}
                        classes={{ label: classes.chipLabel }}
                        color="primary"
                        size="small"
                        label="Interviewed"
                    />

                    {/* <Chip
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        size="small"
                        label="Interviewed"
                    /> */}
                </Grid>
            )}
        </Grid>
    );
};

export default StatusArray;
