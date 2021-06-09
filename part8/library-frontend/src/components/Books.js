import React, { useState } from "react";

const Books = ({ books, show }) => {
  const [booksFilter, setBooksFilter] = useState("all genres");

  const [filteredBooks, setFilteredBooks] = useState(books);

  // flattens books.book.genres arrays and then removes duplicates
  const genresList = books
    .reduce((acc, book) => {
      return acc.concat(book.genres);
    }, [])
    .reduce(
      (acc, current) => {
        return acc.includes(current) ? acc : [...acc, current];
      },
      ["all genres"]
    );

  const booksFilterHandler = (filter) => {
    setBooksFilter(filter);
    if (filter === "all genres") {
      setFilteredBooks(books);
    } else {
      const newBookList = books.filter((book) => {
        return book.genres.includes(filter) ? book : null;
      });
      setFilteredBooks(newBookList);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        In genre: <b>{booksFilter}</b>
      </p>
      <div>
        {genresList.map((genre) => (
          <button key={genre} onClick={() => booksFilterHandler(genre)}>
            {genre}
          </button>
        ))}
      </div>{" "}
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
