import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import AddTodo from './AddTodoForm';
import { TodoListSlice } from './Todo.slice';
import TodoList from './TodoList';
import { getRequest } from './shared/ApiService';
import { useDispatch } from "react-redux";
import { getTodoListUrl } from './shared/constants';


const Todo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getRequest(getTodoListUrl)
      .then((response) => {
        dispatch(TodoListSlice(response.data))
      })
      .catch((error) => {

      });
  }, [dispatch])
  return (

    <>
      <Typography align="center" variant="h6" color="primary">Add Your Todo List</Typography>
      <AddTodo />
      <TodoList />
    </>

  );
}
export default Todo;