import React, { useState } from 'react';
import {
    Paper,
    Grid,
    Box,
    Typography,
    Button,
    IconButton,
    Checkbox,
    InputAdornment,
    TextField,
    FormControlLabel,
    InputLabel,
    Select,
    Input,
    MenuItem,
    ListItemText,
    FormControl,
    FormHelperText,
    Chip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1, 0, 0, 0),
    },
    textField: {
        // width: '100%',
    },
    select: {
        // width: '100%',
        // marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
        margin: theme.spacing(1),
    },
    chip: {
        margin: 2,
    },
    chipLabel: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        fontSize: 11,
    },
    button: {
        margin: theme.spacing(1),
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

const getStyles = (filterOption, filterOptionChoices, theme) => {
    return {
        fontWeight:
            filterOptionChoices.indexOf(filterOption) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

const defaultValues = {
    searchField: '',
    completed: false,
    filters: [],
};

const FilterAndSearch = (props) => {
    const [, , { changeHandler, keyCatcher }] = useGlobalStore();
    const [values, setValues] = useState(defaultValues);
    const classes = useStyles();
    const theme = useTheme();
    const handleChange = changeHandler(values, setValues);

    const {
        assets,
        setAssets,
        sortOptionChoice,
        sortOptions,
        sortSetter,
        filterOptions,
        filterOptionsFunction,
    } = props;

    const onEnter = () => {
        filterAssets();
    };

    const filterAssets = (resetCalled = false) => {
        if (resetCalled === true) {
            console.log('reset');
            setAssets(assets);
            return;
        }

        let searchText = values.searchField.toLowerCase().trim();
        let filteredAssets = assets;

        if (filterOptions) {
            filteredAssets = filterOptionsFunction(filteredAssets, values.filters);
        }

        if (!searchText) {
            setAssets(filteredAssets);
            return;
        }

        const filterFunction = (asset) => {
            let filterMatch = false;

            Object.keys(asset).forEach((key) => {
                const value = asset[key];
                if (key[0] === '_' || typeof value !== 'string') return;

                // TODO consider checking each term individually
                if (value.toLowerCase().trim().includes(searchText)) filterMatch = true;
            });

            return filterMatch;
        };

        filteredAssets = filteredAssets.filter(filterFunction);
        setAssets(filteredAssets);
    };

    const handleFilterChange = (event) => {
        setValues({ ...values, filters: event.target.value });
    };

    const resetFilter = () => {
        setValues({ ...values, filters: [], searchField: '' });
        if (sortOptions){
            sortSetter(0)
        }
        filterAssets(true);
    };

    return (
        <Paper elevation={1}>
            <Box padding={1}>
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <TextField
                        label="Search"
                        id="search-field"
                        variant="outlined"
                        className={clsx(classes.margin, classes.textField)}
                        value={values.searchField}
                        onChange={handleChange('searchField', 'text')}
                        onKeyDown={keyCatcher(onEnter, 'Enter')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <Grid container direction="row">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.completed}
                                    className={clsx(classes.margin)}
                                    onChange={handleChange('completed', 'check')}
                                    name="Hide Completed"
                                    color="primary"
                                />
                            }
                            label="Hide Completed"
                        />
                    </Grid> */}
                    {sortOptions && (
                        <>
                            <FormControl className={classes.margin} variant="outlined">
                                <FormHelperText>Sort</FormHelperText>
                                {/* <InputLabel id="sort-selection-label">Sort</InputLabel> */}
                                <Select
                                    labelId="sort-selection-label"
                                    id="sort-selection"
                                    variant="outlined"
                                    value={sortOptionChoice}
                                    onChange={sortSetter}
                                >
                                    {sortOptions.map((sortOption, index) => (
                                        <MenuItem key={sortOption.key} value={index}>
                                            {sortOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                    {filterOptions && (
                        <>
                            <FormControl className={classes.margin}>
                                <InputLabel id="multiple-filter-label">Filter</InputLabel>
                                <Select
                                    labelId="multiple-filter-label"
                                    id="multiple-filter"
                                    multiple
                                    value={values.filters}
                                    onChange={handleFilterChange}
                                    input={<Input id="multiple-filter-input" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    className={classes.chip}
                                                    color="primary"
                                                    size="small"
                                                    classes={{ label: classes.chipLabel }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {filterOptions.map((filterOption) => (
                                        <MenuItem
                                            key={filterOption.key}
                                            value={filterOption.name}
                                            style={getStyles(filterOption.name, values.filters, theme)}
                                        >
                                            {filterOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <Grid container justify="center" className={classes.margin}>
                        <Button className={classes.button} onClick={resetFilter}>
                            Reset Filter
                        </Button>
                        <Button className={classes.button} onClick={filterAssets}>
                            Filter
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default FilterAndSearch;
