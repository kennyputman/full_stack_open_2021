import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import "./App.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import User from "./components/User";

import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  deleteBlog,
  initBlogs,
  likeBlog,
} from "./reducers/blogReducer";
import { setMessage, clearMessage } from "./reducers/messageReducer";
import { setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  // initialzie users list
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => blogs);
  const message = useSelector(({ message }) => message);
  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);

  console.log(users);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  // -------------- Event Handlers -------------------- //
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setMessage(`Wrong username or password`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const handleLogout = () => {
    console.log("handleLogout Initiated");
    window.localStorage.removeItem("loggedBlogAppUser", JSON.stringify(user));
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    console.log("adding blog with", title, author, url, user);
    try {
      const blogObject = {
        user: user,
        title: title,
        author: author,
        url: url,
      };
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      dispatch(setMessage(`${user.username} added a new blog: ${title}`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (exception) {
      dispatch(setMessage("Blog could not be added"));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const handleDeleteBlog = async (targetBlog) => {
    try {
      const result = window.confirm(`Remove blog ${targetBlog.title}`);
      if (result) {
        dispatch(deleteBlog(targetBlog.id));
      }
    } catch (exception) {
      console.log(`blog delete button failed: ${exception}`);
    }
  };

  const handleAddLike = async (targetBlog) => {
    try {
      const blogObject = {
        user: targetBlog.user,
        likes: targetBlog.likes + 1,
        author: targetBlog.author,
        title: targetBlog.title,
        url: targetBlog.url,
      };

      dispatch(likeBlog(blogObject, targetBlog.id));
    } catch (exception) {
      console.log(`Like button failed: ${exception}`);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        handleAddBlog={handleAddBlog}
        title={title}
        author={author}
        url={url}
        setTitle={({ target }) => setTitle(target.value)}
        setAuthor={({ target }) => setAuthor(target.value)}
        setUrl={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  );

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)} className="btn">
            login
          </button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            setPassword={({ target }) => setPassword(target.value)}
            setUsername={({ target }) => setUsername(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)} className="btn">
            cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>
              {user.name} logged in
              <span>
                <button onClick={handleLogout} className="btn">
                  logout
                </button>
              </span>
            </p>
          </div>
        )}
      </div>

      <Switch>
        <Route path="/users/:id">
          <User></User>
        </Route>
        <Route path="/users">
          <Users users={users}></Users>
        </Route>
        <Route path="/">
          <div className="notification">
            <Notification message={message} />
          </div>

          {blogForm()}

          <Blogs
            blogs={blogs}
            handleDeleteBlog={handleDeleteBlog}
            handleAddLike={handleAddLike}
          ></Blogs>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
