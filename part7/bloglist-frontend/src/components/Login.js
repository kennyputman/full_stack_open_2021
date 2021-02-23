import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={setUsername}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={setPassword}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
