import { useApolloClient, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    console.log("logout");
  };

  const LoginButton = ({ token }) => {
    if (token) {
      return <button onClick={() => logout()}>logout</button>;
    }
    return <button onClick={() => setPage("login")}>login</button>;
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <LoginButton token={token}></LoginButton>
      </div>
      <Notification errorMessage={errorMessage}></Notification>
      <Authors
        show={page === "authors"}
        authors={authors.data.allAuthors}
        setError={notify}
      />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        setError={setErrorMessage}
      ></LoginForm>
    </div>
  );
};

export default App;
