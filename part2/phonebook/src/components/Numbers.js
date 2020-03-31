import React from "react";

const Numbers = (persons, newNameFilter) => {
  if (newNameFilter === "") {
    return persons.map(person => (
      <li key={person.name}>
        {person.name}: {person.number}
      </li>
    ));
  } else {
    return persons
      .filter(person =>
        person.name.toLowerCase().includes(newNameFilter.toLowerCase())
      )
      .map(person => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ));
  }
};

export default Numbers;
