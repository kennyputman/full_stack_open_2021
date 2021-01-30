export const createMessage = (content) => {
  return {
    type: "MESSAGE",
    data: content,
  };
};

const anecdoteReducer = (state = "Test", action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
