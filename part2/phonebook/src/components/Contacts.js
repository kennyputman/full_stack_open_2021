import React from "react";

const Contacts = (persons, newNameFilter, deletePerson) => {
  if (newNameFilter === "") {
    return persons.map((person) => (
      <div key={person.id}>
        {person.name}: {person.number}{" "}
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
    ));
  } else {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(newNameFilter.toLowerCase())
      )
      .map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ));
  }
};

export default Contacts;
