export const setMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: message,
    });
  };
};

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  };
};

const messageReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return "";
    default:
      return state;
  }
};

export default messageReducer;
