import { applyMiddleware, createStore } from "redux";
import blogReducer from "./reducers/blogReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  blogReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
