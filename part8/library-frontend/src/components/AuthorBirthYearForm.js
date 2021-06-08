import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorBirthYearForm = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log("name", name);
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

  const nameHandleChange = (selectedOption) => {
    setName(selectedOption.name);
  };

  if (!localStorage.getItem("library-user-token")) {
    return null;
  }
  return (
    <div>
      <h3>Set Born Year</h3>
      <form onSubmit={submit}>
        <Select
          options={authors}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={nameHandleChange}
          isClearable={true}
        ></Select>
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
