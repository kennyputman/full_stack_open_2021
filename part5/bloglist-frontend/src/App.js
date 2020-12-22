import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import "./App.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [opsMessage, setOpsMessage] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setOpsMessage(`Wrong username or password`);
      setTimeout(() => {
        setOpsMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    console.log("handleLogout Initiated");
    window.localStorage.removeItem("loggedBlogAppUser", JSON.stringify(user));
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    console.log("adding blog with", title, author, url);
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      };
      blogFormRef.current.toggleVisibility();
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setOpsMessage(`${author} added a new blog: ${title}`);
        setTimeout(() => {
          setOpsMessage(null);
        }, 5000);
        setAuthor("");
        setTitle("");
        setUrl("");
      });
    } catch (exception) {
      setOpsMessage("Blog could not be added");
      setTimeout(() => {
        setOpsMessage(null);
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
          <button onClick={() => setLoginVisible(true)} class="btn">
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
          <button onClick={() => setLoginVisible(false)} class="btn">
            cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div class="main">
      <h2>Blogs</h2>
      <div class="notification">
        <Notification message={opsMessage} />
      </div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in
            <span>
              <button onClick={handleLogout} class="btn">
                logout
              </button>
            </span>
          </p>
        </div>
      )}

      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog}></Blog>
        ))}
    </div>
  );
};
export default App;
