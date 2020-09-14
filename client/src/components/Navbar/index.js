import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IconButton, AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../GlobalStore';

import LargeLogo from '../Logo/LargeLogo';
import Sidebar from './Sidebar';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        flexGrow: 1,
        margin: theme.spacing(1, 1),
        textDecoration: 'none',
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    sideMenuButton: {},
    hidden: {
        display: 'none',
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [globalStore] = useGlobalStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AppBar position="fixed">
            <Toolbar>
                {/* <LargeLogo className={classes.logo} /> */}
                <Typography variant="h6" className={classes.logo} component={Link} to="/">
                    Application Assistant
                </Typography>

                <IconButton
                    className={clsx(globalStore.reminders === 0 && classes.hidden)}
                    edge="start"
                    color="inherit"
                    aria-label="reminders"
                    component={Link}
                    to="/todos/reminders"
                >
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton
                    className={classes.sideMenuButton}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setSidebarOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
