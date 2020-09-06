import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        textDecoration: 'underline',
    },
}));

const SectionTitle = (props) => {
    const classes = useStyles();
    const { title } = props;
    return (
        <Typography className={classes.title} variant="h4" align="center">
            {title}
        </Typography>
    );
};

export default SectionTitle;
