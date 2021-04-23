import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import commentReducer from "./reducers/commentReducer";

const reducer = combineReducers({
  comments: commentReducer,
  users: usersReducer,
  user: userReducer,
  blogs: blogReducer,
  message: messageReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
