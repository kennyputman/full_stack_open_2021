import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
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

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log(addedBook);
      notify(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  if (authorsLoading || booksLoading) {
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
      <Recommendations show={page === "recommendations"}></Recommendations>

      <NewBook
        show={page === "add"}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />
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
