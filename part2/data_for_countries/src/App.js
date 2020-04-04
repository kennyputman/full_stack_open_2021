import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const Country = ({ country }) => {
    return <li>{country.name}</li>;
  };

  const CountriesList = ({ countries }) => {
    return (
      <ul>
        {countries.map((country) => (
          <Country key={country.alpha3Code} country={country} />
        ))}
      </ul>
    );
  };
  return (
    <div>
      <h1>Countries</h1>
      <CountriesList countries={countries} />
    </div>
  );
};

export default App;
