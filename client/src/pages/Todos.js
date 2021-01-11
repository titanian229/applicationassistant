import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    // Typography,
    Box,
    // Collapse,
    // IconButton,
    // Paper,
    Grid,
    // List,
    // ListItem,
    // ListItemText,
    // Divider,
    // Avatar,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';

import { useGlobalStore } from '../components/GlobalStore';
import LoadingOverlay from '../components/LoadingOverlay';
// import TodoListItemToggle from '../components/TodoListItemToggle';
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
    { name: 'Completed', key: 'completed' },
    // { name: 'Due', key: 'due' },
];

const Todos = () => {
    // SHOW search bar to search, all todos sorted
    // On click of todo bring to view page for that todo, that has edit button to change things.
    const { filter } = useParams();
    const [, , { API, loadResource, checkReminders }] = useGlobalStore();
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [sortMethod, setSortMethod] = useState(sortOptions[0]);
    // const classes = useStyles();

    useEffect(() => {
        loadResource(async () => API.getTodos(), 'todos', setTodos);
        if (filter === 'reminders'){
            console.log('reminders called upon')
            setSortMethod(sortOptions[1])
        } else {
            setSortMethod(sortOptions[0])
        }
        checkReminders()
        //eslint-disable-next-line
    }, [filter]);

    useEffect(() => {
        checkReminders()
        //eslint-disable-next-line
    }, [todos])

    const sortMethodSetter = (event) => {
        const e = event;
        if (e === 0) {
            setSortMethod(sortOptions[0]);
            return;
        }
        const index = e.target.value;
        setSortMethod(sortOptions[index]);
    };

    const extractIndex = (item) => {
        return sortOptions.map((option) => option.key).indexOf(item);
    };

    return (
        <Grid container direction="column">
            <SectionTitle title="Todos" />
            <Box padding={2}>
                <FilterAndSearch
                    assets={todos}
                    setAssets={setFilteredTodos}
                    sortOptions={sortOptions}
                    sortOptionChoice={extractIndex(sortMethod.key)}
                    sortSetter={sortMethodSetter}
                />
                {/* <List dense>
                    {todos.map((todo) => (
                        <TodoListItemToggle key={todo._id} viewTodo={viewTodo} {...todo} />
                    ))}
                </List> */}
                <TodoListSection
                    todos={filteredTodos.length !== 0 ? filteredTodos : todos}
                    sortMethod={sortMethod.key}
                    refreshTodos={() => loadResource(async () => API.getTodos(), 'todos', setTodos)}
                />
                {/* TOOD remove add button from section and show FAB */}
            </Box>
            <LoadingOverlay />
        </Grid>
    );
};

export default Todos;
