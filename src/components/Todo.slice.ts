import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TodoData } from './TodoInterface';

let TodoListData: TodoData[] = [];

const initialState = {
  TodoList: TodoListData,

};
export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    TodoListSlice: (state, action: PayloadAction<TodoData[]>) => {
      const TodoData = { TodoList: action.payload };
      return {
        ...state,
        ...TodoData
      }
    },
    AddTodoSlice: (state, action: PayloadAction<TodoData[]>) => {
      const TodoData = { TodoList: action.payload };
      return {
        ...state,
        ...TodoData
      }
    },




  }
});

export const { TodoListSlice, AddTodoSlice } = TodoSlice.actions;
