import { useApolloClient, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );

  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const user = useQuery(ME);

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
  };

  return (
    <div>
      <NavBar token={token} setPage={setPage} logout={logout}></NavBar>
      <Notification errorMessage={errorMessage}></Notification>
      <Authors
        show={page === "authors"}
        authors={authors.data.allAuthors}
        setError={notify}
      />

      <Books show={page === "books"} books={books.data.allBooks} />
      <Recommendations
        show={page === "recommendations"}
        books={books.data.allBooks}
        user={user.data.me}
      ></Recommendations>

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
