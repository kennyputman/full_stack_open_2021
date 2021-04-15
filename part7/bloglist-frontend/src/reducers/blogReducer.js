import blogService from "../services/blogs";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "DELETE_BLOG",
      data: { id },
    });
  };
};

export const likeBlog = (id) => {
  // Need to create likeBlog service
  return async (dispatch) => {
    dispatch({
      type: "LIKE_BLOG",
      data: { id },
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    case "LIKE_BLOG": {
      const newState = [...state];
      const index = state.findIndex((blog) => (blog.id = action.data.id));
      newState[index].likes = newState[index].likes + 1;
      return newState;
    }
    default:
      return state;
  }
};

export default blogReducer;
