import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName
    };
    if (persons.some(person => person.name === nameObject.name)) {
      window.alert(`${nameObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const Numbers = ({ persons }) =>
    persons.map(person => <li key={person.name}>{person.name}</li>);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
