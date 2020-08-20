import React from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import ContactsIcon from '@material-ui/icons/ContactsTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AddAlertIcon from '@material-ui/icons/AddAlertTwoTone';
import WorkIcon from '@material-ui/icons/WorkTwoTone';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';

const useStyles = makeStyles((theme) => ({
    sidebarList: {},
    sidebar: {},
    sidebarItem: {},
    sidebarItemText: {
        fontFamily: 'Fira Sans Extra Condensed',
        textAlign: 'left',
    },
}));

const Sidebar = (props) => {
    const { open, setOpen } = props;
    const classes = useStyles();
    const toggleDrawer = (state) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(state);
    };

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            className={classes.sidebar}
        >
            <div className={classes.sidebarList} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <List style={{ paddingTop: '1em' }}>
                    <ListItem button component={Link} to="/applications" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <WorkIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Applications" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/contacts" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <ContactsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Contacts" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/resumes" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Resumes" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/todos" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <AddAlertIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Todos and Reminders" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/settings" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <SettingsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Settings and Profile" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/logout" className={classes.sidebarItem}>
                        <ListItemIcon>
                            <ExitToAppIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Log out" classes={{ primary: classes.sidebarItemText }} />
                    </ListItem>

                    {/* <ListItem button component={Link} to="/overview" className={classes.listItem}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItem>
                         */}
                </List>
            </div>
        </SwipeableDrawer>
    );
};

export default Sidebar;
