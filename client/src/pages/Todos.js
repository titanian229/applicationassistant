import React, { useState, useEffect } from 'react';

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
// import { makeStyles } from '@material-ui/core/styles';
// import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';

import { useGlobalStore } from '../components/GlobalStore';
import LoadingOverlay from '../components/LoadingOverlay';
import TodoListItemToggle from '../components/TodoListItemToggle';
import TodoListSection from '../components/TodoListSection';
import FilterAndSearch from '../components/FilterAndSearch';
import SectionTitle from '../components/SectionTitle';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         marginBottom: theme.spacing(4),
//     },
// }));

const sortOptions = [
    { name: 'Application', key: 'applicationTitle' },
    { name: 'Date', key: 'date' },
    { name: 'Completed', value: 'completed' },
];

const Todos = () => {
    // SHOW search bar to search, all todos sorted
    // On click of todo bring to view page for that todo, that has edit button to change things.
    const [, , { API, loadResource }] = useGlobalStore();
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [sortMethod, setSortMethod] = useState(sortOptions[0]);
    // const classes = useStyles();

    useEffect(() => {
        loadResource(async () => API.getTodos(), 'todos', setTodos);
        //eslint-disable-next-line
    }, []);

    return (
        <Grid container direction="column">
            <SectionTitle title="Todos" />
            <Box padding={2}>
                <FilterAndSearch
                    assets={todos}
                    setAssets={setFilteredTodos}
                    sortOptions={sortOptions}
                    sortSetter={setSortMethod}
                />
                {/* <List dense>
                    {todos.map((todo) => (
                        <TodoListItemToggle key={todo._id} viewTodo={viewTodo} {...todo} />
                    ))}
                </List> */}
                <TodoListSection
                    todos={filteredTodos.length !== 0 ? filteredTodos : todos}
                    sortMethod={sortMethod.key}
                />
                {/* TOOD remove add button from section and show FAB */}
            </Box>
            <LoadingOverlay />
        </Grid>
    );
};

export default Todos;
