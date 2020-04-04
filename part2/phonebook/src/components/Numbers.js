import React from "react";
import Person from "./Person";

const Numbers = (persons, newNameFilter) => {
  if (newNameFilter === "") {
    return persons.map((person) => (
      <Person person={person} key={person.name} />
    ));
  } else {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(newNameFilter.toLowerCase())
      )
      .map((person) => <Person key={person.name} person={person} />);
  }
};

export default Numbers;
