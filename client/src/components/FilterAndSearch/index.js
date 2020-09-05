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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        // width: '100%',
    },
}));

const defaultValues = {
    searchField: '',
};

const FilterAndSearch = (props) => {
    const [, , { changeHandler, keyCatcher }] = useGlobalStore();
    const [values, setValues] = useState(defaultValues);
    const classes = useStyles();
    const handleChange = changeHandler(values, setValues);

    const { assets, setAssets } = props;

    const onEnter = () => {
        filterAssets(values.searchField);
    };

    const filterAssets = (search = '') => {
        let searchText = search.toLowerCase().trim();
        console.log(searchText)
        let filteredAssets = assets;

        if (!search) {
            setAssets(filteredAssets);
            return;
        }

        const filterFunction = (asset) => {
            let filterMatch = false;

            Object.keys(asset).forEach((key) => {
                // console.log(key, value);
                const value = asset[key]
                console.log(value, typeof value, key)
                if (key[0] === '_' || typeof value !== 'string') return;
                console.log("Passed to check", key, value)

                // TODO consider checking each term individually
                if (value.toLowerCase().trim().includes(searchText)) filterMatch = true;
            });

            return filterMatch;
        };

        filteredAssets = filteredAssets.filter(filterFunction);
        setAssets(filteredAssets);
    };

    return (
        <Paper elevation={4}>
            <Box padding={1}>
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <TextField
                        label="Search"
                        id="search-field"
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
                </Grid>
            </Box>
        </Paper>
    );
};

export default FilterAndSearch;
