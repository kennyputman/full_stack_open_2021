import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");

  const addContact = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };

    if (persons.some(person => person.name === nameObject.name)) {
      window.alert(`${nameObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleNameFilterChange = event => {
    setNewNameFilter(event.target.value);
  };

  const Numbers = ({ persons }) => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with{" "}
        <input value={newNameFilter} onChange={handleNameFilterChange} />
      </div>
      <h3>Add a New Contact</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
