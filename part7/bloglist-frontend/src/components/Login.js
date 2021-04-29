import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, clearMessage } from "../reducers/messageReducer";
import { setUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Notification from "./Notification";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const message = useSelector(({ message }) => message);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
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
      history.push("/");
    } catch (exception) {
      dispatch(setMessage(`Wrong username or password`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <div className="notification">
        <Notification message={message} />
      </div>
      <form onSubmit={handleLogin}>
        <Box m={1}>
          <Typography>Username</Typography>
          <TextField
            id="username"
            type="text"
            name="Username"
            component={Paper}
            onChange={handleUsernameChange}
          />
        </Box>
        <Box m={1}>
          <Typography>password</Typography>

          <TextField
            id="password"
            type="password"
            name="Password"
            component={Paper}
            onChange={handlePasswordChange}
          />
        </Box>
        <Box m={1}>
          <Button
            variant="contained"
            color="primary"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default LoginForm;
