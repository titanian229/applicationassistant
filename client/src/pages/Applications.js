import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    // Typography,
    TextField,
    // Button,
    InputAdornment,
    IconButton,
    // Box,
    // Paper,
    Grid,
    // Container,
    Select,
    Input,
    InputLabel,
    Checkbox,
    MenuItem,
    FormControl,
    // List,
    // ListItem,
    ListItemText,
    Divider,
    Fab,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import Application from '../components/Application';
import { useGlobalStore } from '../components/GlobalStore';
import API from '../utils/API';
import SectionTitle from '../components/SectionTitle'

const useStyles = makeStyles((theme) => ({
    filterHeader: {
        // backgroundColor: lighten(theme.palette.secondary.main, 0.8),
    },
    searchField: {},
    select: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    applicationsContainer: {},
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
    },
}));

const filterOptions = ['Wishlist', 'Applied', 'Interviewed', 'Heard back'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// TESTING DATA

const Applications = (props) => {
    // Sidenav on desktop, top header on mobile
    const classes = useStyles();
    const [, , { loadResource }] = useGlobalStore();
    const emptyValues = {
        search: '',
        filter: [],
    };
    const [values, setValues] = useState(emptyValues);
    const [applicationData, setApplicationData] = useState([]);

    // const fetchApplications = async () => {
    //     loadResource(async () => API.getApplications(), 'applications', setApplicationData)
    // };

    useEffect(() => {
        loadResource(async () => API.getApplications(), 'applications', setApplicationData);
        // eslint-disable-next-line
    }, []);

    const handleChange = (property) => (event) => {
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSearchSubmit = () => {};

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
            return;
        }
    };

    return (
        <div>
            <Fab component={Link} to="/newapplication" className={classes.fab} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <SectionTitle title='Applications' />
            <div className={classes.filterHeader}>
                <TextField
                    className={classes.searchField}
                    fullWidth
                    // focused
                    type="text"
                    label="Search"
                    variant="outlined"
                    value={values.search}
                    onChange={handleChange('search')}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="search" onClick={handleSearchSubmit}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Grid>
                    <FormControl className={classes.select} variant="outlined">
                        <InputLabel id="filter-selection">Filter</InputLabel>
                        <Select
                            labelId="filter-selection"
                            id="filter-select"
                            multiple
                            // variant="outlined"
                            value={values.filter}
                            onChange={handleChange('filter')}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {filterOptions.map((filterOption) => (
                                <MenuItem key={filterOption} value={filterOption}>
                                    <Checkbox checked={values.filter.indexOf(filterOption) > -1} />
                                    <ListItemText primary={filterOption} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </div>
            <Divider />
            <Grid container className={classes.applicationsContainer}>
                {applicationData.map((application) => (
                    <Application applicationData={application} key={application._id} />
                ))}
            </Grid>
        </div>
    );
};

export default Applications;
