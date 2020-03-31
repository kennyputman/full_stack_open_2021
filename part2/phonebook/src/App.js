import React, { useState } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

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

  return (
    <div>
      <h2>Phonebook</h2>
      {Filter(newNameFilter, handleNameFilterChange)}
      <h3>Add a New Contact</h3>
      {PersonForm(
        addContact,
        newName,
        handleNameChange,
        newNumber,
        handleNumberChange
      )}
      <h3>Numbers</h3>
      {Numbers(persons, newNameFilter)}
    </div>
  );
};

export default App;
