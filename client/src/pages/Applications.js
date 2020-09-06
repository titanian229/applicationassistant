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
import SectionTitle from '../components/SectionTitle';
import FilterAndSearch from '../components/FilterAndSearch';

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

const filterOptions = [
    { name: 'Applied', key: 'applied' },
    { name: 'Researched', key: 'researched' },
    { name: 'Interviewed', key: 'interviewed' },
    { name: 'Has Todos', key: 'todos' },
    { name: 'Heard back', key: 'heardBack' },
];

const Applications = (props) => {
    // Sidenav on desktop, top header on mobile
    const classes = useStyles();
    const [, , { loadResource, API }] = useGlobalStore();
    const emptyValues = {
        search: '',
        filter: [],
    };
    const [values, setValues] = useState(emptyValues);
    const [applicationData, setApplicationData] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState(null);
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

    const extractNames = (keysArray) => {
        console.log('keysArray', keysArray);
        console.log(
            'index, item',
            filterOptions.map((option) => option.key)
        );

        keysArray.forEach((key) => {
            const index = filterOptions.map((option) => option.key).indexOf(key);
            console.log('extractNames -> index', index);
            console.log('index value', keysArray[index]);
        });

        let ret = keysArray.map((key) => filterOptions[filterOptions.map((option) => option.key).indexOf(key)].name);
        console.log('extractNames -> ret', ret);
        return ret;
    };

    const filterApplicationsTags = (applications, filter) => {
        console.log('filter function called in parent', filter);
        let filteredApplications = applications;

        if (!filter) {
            return filteredApplications;
        }

        let filterKeys = filter.map(
            (filterValue) => filterOptions[filterOptions.map((option) => option.name).indexOf(filterValue)].key
        );

        if (filterKeys.includes('applied')) {
            filteredApplications = filteredApplications.filter((application) => application.haveApplied === true);
        }
        if (filterKeys.includes('researched')) {
            filteredApplications = filteredApplications.filter((application) => application.haveResearched === true);
        }
        if (filterKeys.includes('interviewed')) {
            filteredApplications = filteredApplications.filter((application) => application.interviewsArray.length > 0);
        }
        if (filterKeys.includes('todos')) {
            filteredApplications = filteredApplications.filter((application) => application.todos.length > 0);
        }
        if (filterKeys.includes('heardBack')) {
            filteredApplications = filteredApplications.filter((application) => application.heardBack === true);
        }

        return filteredApplications;
    };

    return (
        <div>
            <Fab component={Link} to="/newapplication" className={classes.fab} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <SectionTitle title="Applications" />
            <div className={classes.filterHeader}>
                <FilterAndSearch
                    assets={applicationData}
                    setAssets={setFilteredApplications}
                    filterOptions={filterOptions}
                    filterOptionsFunction={filterApplicationsTags}
                    // sortOptions={sortOptions}
                    // sortOptionChoice={extractIndex(sortMethod.key)}
                    // sortSetter={sortMethodSetter}
                />
                {/* <TextField
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
                </Grid> */}
            </div>
            <Divider />
            <Grid container className={classes.applicationsContainer}>
                {(filteredApplications !== null ? filteredApplications : applicationData).map((application) => (
                    <Application applicationData={application} key={application._id} />
                ))}
            </Grid>
        </div>
    );
};

export default Applications;
