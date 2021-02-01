export const setMessage = (content, time) => {
  return async (dispatch) => {
    console.log("called setMessage");
    dispatch({ type: "CREATE_MESSAGE", data: content });
    await new Promise((r) => setTimeout(r, time * 1000));
    dispatch({ type: "REMOVE_MESSAGE" });
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
