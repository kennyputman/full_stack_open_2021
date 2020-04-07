import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [id, setID] = useState(4);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const addContact = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: setID(id + 1),
    };

    if (persons.some((person) => person.name === nameObject.name)) {
      if (
        window.confirm(
          `${nameObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const matchedPerson = persons.find(
          (person) => person.name === nameObject.name
        );
        const updatedPerson = { ...matchedPerson, number: nameObject.number };

        personsService
          .changeNumber(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewNumber("");
            setNewName("");
          });
      }
    } else {
      personsService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewNumber("");
          setNewName("");
          setErrorMessage(`Added ${nameObject.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      <Notification message={errorMessage}></Notification>
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
