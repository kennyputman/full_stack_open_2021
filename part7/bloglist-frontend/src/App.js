import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";

import { useDispatch, useSelector } from "react-redux";
import { createBlog, initBlogs } from "./reducers/blogReducer";
import { setMessage, clearMessage } from "./reducers/messageReducer";
import { setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initComments } from "./reducers/commentReducer";

import {
  AppBar,
  Toolbar,
  Button,
  ThemeProvider,
  Container,
  CssBaseline,
} from "@material-ui/core";
import customTheme from "./styles/theme";

const theme = customTheme;

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

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initComments());
  }, [dispatch]);

  const message = useSelector(({ message }) => message);
  const user = useSelector(({ user }) => user);

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
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Router>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit">
                {user === null ? (
                  loginForm()
                ) : (
                  <div>
                    <p>
                      {user.name} logged in
                      <span>
                        <Button onClick={handleLogout} className="btn">
                          logout
                        </Button>
                      </span>
                    </p>
                  </div>
                )}
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Switch>
            <Route exact path="/">
              <div className="notification">
                <Notification message={message} />
              </div>

              {blogForm()}

              <Blogs></Blogs>
            </Route>
            <Route path="/users/:id">
              <User></User>
            </Route>
            <Route path="/users">
              <Users></Users>
            </Route>

            <Route path="/blogs/:id">
              <Blog></Blog>
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};
export default App;
