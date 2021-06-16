import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import { ME, ALL_BOOKS } from "../queries";

const Recommendations = ({ show }) => {
  const user = useQuery(ME);
  const [favoriteGenre, setfavoriteGenre] = useState("all genres");
  const [getRecommendations, result] = useLazyQuery(ALL_BOOKS);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (result.data) {
      setRecommendations(result.data.allBooks);
    }
  }, [setRecommendations, result]);

  useEffect(() => {
    if (user.data) {
      console.log(user.data.me);
      getRecommendations({ variables: { genre: user.data.me.favoriteGenre } });
      setfavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [getRecommendations, user]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        Books in your favorite genre: <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommendations.map((book) => (
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
