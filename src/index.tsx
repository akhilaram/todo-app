import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Todo from './components/Todo';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { appSlice } from "./app.slice";
import { TodoSlice } from './components/Todo.slice';
const rootReducer = combineReducers({
  app: appSlice.reducer,
  todo: TodoSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Todo />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

