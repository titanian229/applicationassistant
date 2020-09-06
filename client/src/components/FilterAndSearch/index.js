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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const defaultValues = {
    searchField: '',
    completed: false,
};

const FilterAndSearch = (props) => {
    const [, , { changeHandler, keyCatcher }] = useGlobalStore();
    const [values, setValues] = useState(defaultValues);
    const classes = useStyles();
    const handleChange = changeHandler(values, setValues);

    const { assets, setAssets, sortOptionChoice, sortOptions, sortSetter } = props;

    const onEnter = () => {
        filterAssets(values.searchField);
    };

    const filterAssets = (search = '') => {
        let searchText = search.toLowerCase().trim();
        console.log(searchText);
        let filteredAssets = assets;

        if (!search) {
            setAssets(filteredAssets);
            return;
        }

        const filterFunction = (asset) => {
            let filterMatch = false;

            Object.keys(asset).forEach((key) => {
                // console.log(key, value);
                const value = asset[key];
                console.log(value, typeof value, key);
                if (key[0] === '_' || typeof value !== 'string') return;

                // TODO consider checking each term individually
                if (value.toLowerCase().trim().includes(searchText)) filterMatch = true;
            });

            return filterMatch;
        };

        filteredAssets = filteredAssets.filter(filterFunction);
        setAssets(filteredAssets);
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
                            {/* <FormControl className={classes.select} variant="outlined">
                                <InputLabel id="filter-selection">Filter</InputLabel>
                                <Select
                                    labelId="filter-selection"
                                    id="filter-select"
                                    // variant="outlined"
                                    value={sortOptionChoice}
                                    onChange={handleSortChange}
                                    input={<Input />}
                                    MenuProps={MenuProps}
                                >
                                    {sortOptions.map((sortOption) => (
                                        <MenuItem key={sortOption.value} value={sortOption.value}>
                                            <Checkbox checked={sortOption === sortOptionChoice} />
                                            <ListItemText primary={sortOption.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl> */}
                        </>
                    )}
                </Grid>
            </Box>
        </Paper>
    );
};

export default FilterAndSearch;
