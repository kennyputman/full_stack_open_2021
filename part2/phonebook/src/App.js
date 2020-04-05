import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [id, setID] = useState(4);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
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
      axios
        .post("http://localhost:3001/persons", nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
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
