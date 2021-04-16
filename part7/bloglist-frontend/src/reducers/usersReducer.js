import usersService from "../services/usersRepo";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({ type: "INIT_USERS", data: users });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;
