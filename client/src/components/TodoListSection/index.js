import React, { useState, useEffect } from 'react';
import { List, Typography, Collapse, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AddButton from '../AddButton';
import TodoListItemToggle from '../TodoListItemToggle';
import TodoNew from '../TodoNew';

import { useGlobalStore } from '../GlobalStore';

const useListSectionStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    red: {
        color: 'red',
    },
}));

const today = new Date();

const ApplicationListSection = (props) => {
    const [open, setOpen] = useState(false);
    const { title, todos, viewTodo, refreshTodos } = props;
    const classes = useListSectionStyles();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <BusinessCenterOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={title} className={clsx(todos[0].colour === 'red' && classes.red)} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {todos.map((todo) => (
                        <TodoListItemToggle key={todo._id} viewTodo={viewTodo} className={classes.nested} refreshTodos={refreshTodos} {...todo} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

const TodoListSection = (props) => {
    const { todos, refreshTodos, sortMethod } = props;

    const [todoNewOpen, setTodoNewOpen] = useState(false);
    const [viewTodoItem, setViewTodoItem] = useState({});
    const [sortedTodos, setSortedTodos] = useState({});
    const [unsortedTodos, setUnsortedTodos] = useState([]);
    // const [sortMethod, setSortMethod] = useState('date');
    const [, dispatch, { processServerResponse, API, formatDate }] = useGlobalStore();

    useEffect(() => {
        const [sortedTodosList, unsortedTodosList] = sortTodos(todos);
        setSortedTodos(sortedTodosList);
        setUnsortedTodos(unsortedTodosList);
    }, [todos, sortMethod]);

    const viewTodo = (todo) => {
        setViewTodoItem(todo);
        setTodoNewOpen(true);
    };

    const saveTodo = async (todo) => {
        setTodoNewOpen(false);
        setViewTodoItem({});
        if (!todo) return;

        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.updateTodo(todo);
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        refreshTodos();
    };

    const removeTodo = async (todo) => {
        console.log('removeTodo -> todo', todo);
        setTodoNewOpen(false);
        setViewTodoItem({});
        dispatch({ do: 'setLoading', loading: true });
        const serverResponse = await API.deleteTodo(todo._id, 'none');
        const serverUp = processServerResponse(serverResponse);
        dispatch({ do: 'setLoading', loading: false });
        if (serverUp === false) return;
        refreshTodos();
    };

    const sortTodos = (todos) => {
        if (!todos) return [{}, []];
        let sortedTodos = {};
        let unsortedTodos = [];

        todos.forEach((todo) => {
            if (todo[sortMethod] === undefined || todo[sortMethod] === '' || todo[sortMethod] === null) {
                console.log('unsorted', todo, sortMethod, todo[sortMethod]);
                unsortedTodos.push(todo);
                return;
            }

            let sortValue = todo[sortMethod];
            if (sortMethod === 'date') {
                sortValue = formatDate(sortValue);
                let date = new Date(todo.date);
                if (
                    (date.getTime() < today.getTime() ||
                    (date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate())) && !todo.completed
                ) {
                    todo.colour = 'red';
                }
            }

            if (sortedTodos[sortValue]) {
                sortedTodos[sortValue].push(todo);
                return;
            }

            sortedTodos[sortValue] = [todo];
        });

        return [sortedTodos, unsortedTodos];
    };

    // const sortTodos = (todos) => {
    //     if (!todos) return [{}, []];
    //     console.log('todos', todos);
    //     let sortedTodos = {};
    //     let unsortedTodos = []; //return this

    //     todos.forEach((todo) => {
    //         if (!todo.parentApplication) {
    //             unsortedTodos.push(todo);
    //             return;
    //         }

    //         const sectionName = `${todo.parentApplication.businessName}${
    //             todo.parentApplication.roleTitle ? ' - ' : ''
    //         }${todo.parentApplication.roleTitle}`;

    //         if (sortedTodos[sectionName]) {
    //             sortedTodos[sectionName].push(todo);
    //             return;
    //         }
    //         sortedTodos[sectionName] = [todo];
    //     });

    //     return [sortedTodos, unsortedTodos];
    // };

    return (
        <List>
            {Object.keys(sortedTodos)
                .sort()
                .map((application, index) => (
                    <ApplicationListSection
                        key={index}
                        title={application}
                        todos={sortedTodos[application]}
                        viewTodo={viewTodo}
                        refreshTodos={refreshTodos}
                    />
                ))}
            {/* {todos.map((todo) => (
                <TodoListItemToggle key={todo._id} viewTodo={viewTodo} {...todo} />
            ))} */}
            {unsortedTodos.length > 0 && (
                <ApplicationListSection title="None" todos={unsortedTodos} viewTodo={viewTodo} refreshTodos={refreshTodos} />
            )}
            <TodoNew open={todoNewOpen} todo={viewTodoItem} saveTodo={saveTodo} todoCount={0} removeTodo={removeTodo} />
        </List>
    );
};

export default TodoListSection;
