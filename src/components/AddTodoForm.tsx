import { Box, Grid, Paper, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { postRequest, getRequest } from './shared/ApiService';
import { getTodoListUrl, addTodoListUrl } from './shared/constants';

import { TodoListSlice } from './Todo.slice';
import { AddCircle } from '@material-ui/icons';
import { TodoData } from './TodoInterface';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    }
}));

interface FormData {


    content: string


}

const initialForm: FormData = {


    content: ""

};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj;
}
const AddTodo = (props: any) => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const classes = useStyles();

    const [formData, setFormData] = useState(initialForm);
    const [formValidity, setFormValidity] = useState(false);
    const [error, setError] = useState("");


    // const postData = {
    //     id: useSelector((state: RootState) => state.auth.userId),
    //     token: useSelector((state: RootState) => state.auth.idToken),
    // };
    //  const formError = useSelector((state: RootState) => state.auth.error);


    // if (formError) {
    //     errorMessage = (
    //         <Typography variant="body2" color="secondary">
    //             {formError.message}
    //         </Typography>
    //     );
    // }
    const dispatch = useDispatch();

    let todoList: TodoData[] = useSelector((state: RootState) => state.todo.TodoList);

    const onSubmit = async (data: FormData) => {
        let id: number = todoList.length + 1;
        let todoData: TodoData = {
            index: id,
            ...data

            // status: true,

        }

        postRequest(addTodoListUrl, todoData, 'json')
            .then((response: any) => {

                getRequest(getTodoListUrl, 'json').then(response => {

                    dispatch(TodoListSlice(response.data))
                    setFormData(initialForm)
                }).catch(error => {

                    setError("Todo not added.Please Add again.")

                })

            }).catch(error => {

                setError("Todo not added.Please Add again.")

            })
    }

    const handleChange = (event: any) => {
        let form = { ...formData } as any;
        let property = event.target.name as string;

        if (hasKey(form, property)) {
            form[property] = event.target.value;
        }
        setFormData(form);
        setFormValidity(!formValidity);
    };
    return (
        <Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Paper elevation={3}>
                <form className={classes.formControl} onSubmit={handleSubmit(onSubmit)}>


                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        <TextField
                            inputRef={register({
                                required: "Todo Required",
                            })}
                            name="content"
                            label="Todo"
                            value={formData.content}
                            error={errors?.content ? true : false}
                            helperText={errors?.content?.message}
                            onChange={handleChange}
                        />

                        <IconButton type="submit" color="primary" size="medium" aria-label="add to technologies">
                            <AddCircle />
                        </IconButton>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
export default AddTodo;