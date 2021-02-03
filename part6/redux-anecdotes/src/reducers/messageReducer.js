let timeout = null;

export const setMessage = (content, time) => {
  return async (dispatch) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    dispatch({ type: "CREATE_MESSAGE", data: content });
    timeout = setTimeout(() => {
      dispatch({ type: "REMOVE_MESSAGE" });
    }, time * 1000);
  };
};
const anecdoteReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_MESSAGE":
      return action.data;
    case "REMOVE_MESSAGE":
      return null;
    default:
      return state;
  }
};

export default anecdoteReducer;
