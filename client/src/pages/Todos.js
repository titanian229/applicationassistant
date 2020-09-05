import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Typography,
    Box,
    Collapse,
    IconButton,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';


import { useGlobalStore } from '../components/GlobalStore';
import LoadingOverlay from '../components/LoadingOverlay';

const useStyles = makeStyles((theme) => ({
    
}));

const Todos = (props) => {
    // SHOW search bar to search, all todos sorted
    // On click of todo bring to view page for that todo, that has edit button to change things.
    const [, , { API, loadResource }] = useGlobalStore();
    const [todos, setTodos] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        loadResource(() => API.getTodos(), 'todos', setTodos);
    };

    return (
        <Grid container direction="column">
            <Box padding={2}>
                <TodoListSection todos={todos} refreshTodos={getTodos} />
            </Box>
            <LoadingOverlay />
        </Grid>
    );
};

export default Todos;
