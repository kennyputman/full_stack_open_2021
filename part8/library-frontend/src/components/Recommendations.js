import React from "react";
const Recommendations = ({ books, show, user }) => {
  if (!show || !user) {
    return null;
  }

  const recommendedBooks = books.filter((book) => {
    return book.genres.includes(user.favoriteGenre) ? book : null;
  });

  return (
    <div>
      <h2>books</h2>
      <p>
        Books in your favorite genre: <b>{user.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommendedBooks.map((book) => (
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

export default Recommendations;
