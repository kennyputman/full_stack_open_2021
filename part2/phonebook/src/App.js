import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [id, setID] = useState(4);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: setID(id + 1),
    };

    if (persons.some((person) => person.name === nameObject.name)) {
      window.alert(`${nameObject.name} is already added to phonebook`);
    } else {
      personsService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewNumber("");
          setNewName("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value);
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.removePerson(person).then(() => {
        setPersons(persons.filter((eachPerson) => eachPerson.id !== person.id));
      });
    }
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
      {Contacts(persons, newNameFilter, deletePerson)}
    </div>
  );
};

export default App;
