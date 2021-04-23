import commentService from "../services/comments";

export const initComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch({ type: "INIT_COMMENTS", data: comments });
  };
};

export const createComment = (content) => {
  return async (dispatch) => {
    const newComment = await commentService.create(content);
    dispatch({
      type: "NEW_COMMENT",
      data: newComment,
    });
  };
};

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_COMMENT":
      return [...state, action.data];
    case "INIT_COMMENTS":
      return action.data;
    default:
      return state;
  }
};

export default commentReducer;
