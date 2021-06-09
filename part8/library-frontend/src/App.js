import { useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
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

  const { data: authors, loading: authorsLoading } = useQuery(ALL_AUTHORS);
  const { data: books, loading: booksLoading } = useQuery(ALL_BOOKS);
  const { data: user } = useQuery(ME);

  const [getRecs, { data: userRecs, loading: userRecsLoading }] =
    useLazyQuery(ALL_BOOKS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (authorsLoading || booksLoading || userRecsLoading) {
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
        authors={authors.allAuthors}
        setError={notify}
      />

      <Books show={page === "books"} books={books.allBooks} />
      <Recommendations
        show={page === "recommendations"}
        user={user.me}
        books={books.allBooks}
        onClick={() => getRecs({ variables: { genre: user.me.favoriteGenre } })}
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
