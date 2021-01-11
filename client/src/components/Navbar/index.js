import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IconButton, AppBar, Toolbar, Typography, Tooltip, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../GlobalStore';

// import LargeLogo from '../Logo/LargeLogo';
import Sidebar from './Sidebar';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import WorkIcon from '@material-ui/icons/WorkTwoTone';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

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
    desktopNavIcons: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        margin: theme.spacing(0, 2, 0, 0),
    },
    hideonDesktop: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    divider: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        margin: theme.spacing(0, 3, 0, 1),
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
                {/* //icons visible on desktop view */}
                {globalStore.isAuthenticated ? (
                    <>
                        <Tooltip title="Applications">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Applications"
                                component={Link}
                                to="/applications"
                            >
                                <WorkIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Contacts">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Contacts"
                                component={Link}
                                to="/contacts"
                            >
                                <ContactsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Resumes">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Resumes"
                                component={Link}
                                to="/resumes"
                            >
                                <DescriptionIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Todos and Reminders">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Todos and Reminders"
                                component={Link}
                                to="/todos"
                            >
                                <AddAlertIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider className={classes.divider} orientation="vertical" flexItem />

                        <Tooltip title="Settings and Profile">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Settings and Profile"
                                component={Link}
                                to="/settings"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Log Out">
                            <IconButton
                                className={classes.desktopNavIcons}
                                edge="start"
                                color="inherit"
                                aria-label="Log out"
                                component={Link}
                                to="/logout"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Tooltip>
                        {/* //END DESKTOP BUTTONS */}
                    </>
                ) : (
                    <Tooltip title="Log In">
                        <IconButton
                            className={classes.desktopNavIcons}
                            edge="start"
                            color="inherit"
                            aria-label="Log In"
                            component={Link}
                            to="/login"
                        >
                            <LockOpenOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )}
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
                    className={clsx(classes.sideMenuButton, classes.hideonDesktop)}
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
