import React, { useState } from 'react';
import { List } from '@material-ui/core';

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

import AddButton from '../AddButton';
import TodoListItemToggle from '../TodoListItemToggle';
import TodoNew from '../TodoNew';

import { useGlobalStore } from '../GlobalStore';

const TodoListSection = (props) => {
    const { todos, refreshTodos } = props;

    const [newTodoOpen, setNewTodoOpen] = useState(false);
    const [, , { processServerResponse, API }] = useGlobalStore();

    const viewTodo = (todo) => {
        console.log(todo);
    };

    return (
        <List dense>
            {todos.map((todo) => (
                <TodoListItemToggle key={todo._id} viewTodo={viewTodo} {...todo} />
            ))}
        </List>
    );
};

export default TodoListSection;
