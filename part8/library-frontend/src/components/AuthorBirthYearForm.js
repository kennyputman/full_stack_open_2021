import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorBirthYearForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    setBirthYear({
      variables: { name, born },
    });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("person not found");
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h3>Set Born Year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default AuthorBirthYearForm;
