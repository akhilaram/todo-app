import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { DeleteForever, Edit, Save } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { TodoData } from './TodoInterface';
import { deleteRequest, getRequest, postRequest } from './shared/ApiService';
import { deleteTodoListUrl, updateTodoListUrl, getTodoListUrl } from './shared/constants';
import { TodoListSlice } from './Todo.slice';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  todo: {

    margin: theme.spacing(1),
    width: '25ch',

  },
}));


export default function TodoList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let todoList: TodoData[] = useSelector((state: RootState) => state.todo.TodoList);
  const [error, setError] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const [updateFlag, setUpdateFlag] = useState(false)
  const deleteTodo = (index: number, content: string) => {

    deleteRequest(deleteTodoListUrl + index)
      .then((response: any) => {

        getRequest(getTodoListUrl, 'json').then(response => {

          dispatch(TodoListSlice(response.data))
          error && setError("");
        }).catch(error => {

          setError(`Todo ${content} not deleted`);

        })

      }).catch(error => {
        setError(`Todo ${content} not deleted`);
      })
  }

  const updateTodo = (id: number, name: string) => {
    let updateData = { index: id, content: name };
    postRequest(updateTodoListUrl, updateData, 'json')
      .then((response: any) => {

        getRequest(getTodoListUrl, 'json').then(response => {

          dispatch(TodoListSlice(response.data))
          setUpdateFlag(!updateFlag);
          error && setError("");
        }).catch(error => {

          setError(`Todo ${name} not updated`);

        })

      }).catch(error => {
        setError(`Todo ${name} not updated`);
      })
  }
  const handleChange = (event: any) => {

    setUpdateValue(event.target.value);

  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {todoList.map((todo: TodoData) => <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        key={todo.index}
      >



        {updateFlag ?
          <>  <TextField
            name="content"
            defaultValue={todo.content}
            onChange={handleChange}
            className={classes.todo}

          /> <IconButton type="submit" onClick={() => updateValue !== "" ? updateTodo(todo.index, updateValue) : setUpdateFlag(!updateFlag)} color="primary" size="small" aria-label="add to technologies">
              <Save />
            </IconButton> </> : <><span className={classes.todo}>{todo.content}</span><IconButton type="submit" onClick={() => setUpdateFlag(!updateFlag)} color="primary" size="small" aria-label="add to technologies">
              <Edit />
            </IconButton></>}
        <IconButton type="submit" onClick={() => deleteTodo(todo.index, todo.content)} color="secondary" size="small" aria-label="add to technologies">
          <DeleteForever />
        </IconButton>


      </Grid>)}</>
  );
}
