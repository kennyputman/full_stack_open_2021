import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const Numbers = ({ persons }) =>
    persons.map(person => (
      <li key={person.name}>
        {person.name}: {person.number}
      </li>
    ));

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
