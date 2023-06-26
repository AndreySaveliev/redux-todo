import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const res = await fetch('http://localhost:7000/todos');
  const todos = await res.json();
  return { todos };
});

export const addTodosAsync = createAsyncThunk('todos/addTodosAsync', async (payload) => {
  const res = await fetch('http://localhost:7000/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: payload.title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const todo = await res.json();
  return { todo };
});

export const toggleCopmleteAsync = createAsyncThunk('todos/completeTodoAsync', async (payload) => {
  const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: payload.completed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const todos = await res.json();
  return { todos };
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (payload) => {
  const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
    method: 'DELETE',
  });
  // const todos = await res.json();
  if (res.ok) {
    return {id : payload.id}
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'todo1', completed: false },
    { id: 2, title: 'todo2', completed: true },
    // { id: 3, title: 'todo3', completed: true },
    // { id: 4, title: 'todo4', completed: false },
    // { id: 5, title: 'todo5', completed: false },
    // { id: 6, title: 'todo6', completed: true },
    // { id: 7, title: 'todo7', completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        conplited: false,
      };
      state.push(newTodo);
    },
    toggleComplite: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCopmleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
  },
});

export const { addTodo, toggleComplite, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
