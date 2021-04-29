import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Login from "./components/Login";

import { useDispatch, useSelector } from "react-redux";
import { createBlog, initBlogs } from "./reducers/blogReducer";
import { setMessage, clearMessage } from "./reducers/messageReducer";
import { setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initComments } from "./reducers/commentReducer";

import {
  Link,
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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initializeUsers());
    dispatch(initComments());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const message = useSelector(({ message }) => message);
  const user = useSelector(({ user }) => user);

  // -------------- Event Handlers -------------------- //

  const handleLogout = () => {
    console.log("handleLogout Initiated");
    window.localStorage.removeItem("loggedBlogAppUser", JSON.stringify(user));
    dispatch(setUser(null));
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssBaseline></CssBaseline>
      <Router>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Button color="inherit" component={RouterLink} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={RouterLink} to="/users">
                Users
              </Button>
              {user === null ? (
                <Button align="right">
                  <Link color="inherit" component={RouterLink} to="/login">
                    Login
                  </Link>
                </Button>
              ) : (
                <Button color="inherit" onClick={handleLogout} className="btn">
                  logout
                </Button>
              )}
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
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
