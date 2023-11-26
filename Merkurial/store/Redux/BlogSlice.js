import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  individual: {
    body: "",
    author: "",
    _id: "",
    title: "",
    link: "",
  },
  timeToUpdate: 5000,
};
const BlogSlice = createSlice({
  name: "BLOGS",
  initialState: initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs + action.payload;
    },
    updateDynamic: (state, action) => {
      state.individual = action.payload;
    },
    updateBlogs: (state, action) => {
      // console.log("ACTION.PAYLOAD: ", action.payload);
      state.blogs = action.payload;
    },
  },
});

export default BlogSlice;
export const { addNew, updateBlogs } = BlogSlice.actions;
