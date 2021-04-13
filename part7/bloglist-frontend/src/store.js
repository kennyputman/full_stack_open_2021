import { applyMiddleware, createStore } from "redux";
import blogReducer from "./reducers/blogReducer";
import thunk from "redux-thunk";

const store = createStore(blogReducer, applyMiddleware(thunk));

export default store;
