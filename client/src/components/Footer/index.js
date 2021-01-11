import React from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';

import { Typography, Link } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        lineHeight: 3,
        backgroundColor: theme.palette.primary.light,
        // position: 'fixed',
        // left: 0,
        // right: 0,
        // bottom: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // width: '100%',
        textAlign: 'right',
        paddingRight: '7em',
    },
    textStyle: {
        verticalAlign: 'middle',
        lineHeight: '60%'
    },
    // icon: {
    //     fontSize: 'inherit',
    // },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography className={classes.textStyle} variant="overline">
                &#169; 2020 James Lee{' '}
            </Typography>
            <Link color="secondary" target="_blank" rel="noreferrer noopener" href="https://github.com/titanian229">
                <span className={classes.textStyle}>
                    {'   '}
                    <GitHubIcon className={classes.icon} />
                </span>
            </Link>
        </div>
    );
};

export default Footer;
