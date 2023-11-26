import { createSlice } from "@reduxjs/toolkit";
const initialCurrent = { item: "", time: "", time2: "" };
const initialState = {
  todos: [],
  current: { ...initialCurrent },
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    resetCurrent: (state, action) => {
      state.current = { item: "", time: "", time2: "" };
    },

    addItem: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },

    removeItem: (state, action) => {
      state.todos.splice(action.payload, 1);
    },

    handleChange: (state, action) => {
      const option = action.payload.option;
      const char = action.payload.char;
      state.current[option] = char;
    },
  },
});

export default TodoSlice;
