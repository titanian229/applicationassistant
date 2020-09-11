import React, { useState } from 'react';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import LargeLogo from '../Logo/LargeLogo';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        flexGrow: 1,
        margin: theme.spacing(1, 2),
    },
    sideMenuButton: {},
}));

const Navbar = () => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <LargeLogo className={classes.logo} />

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
