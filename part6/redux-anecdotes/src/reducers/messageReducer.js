export const createMessage = (content) => {
  return {
    type: "CREATE_MESSAGE",
    data: content,
  };
};
export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
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
