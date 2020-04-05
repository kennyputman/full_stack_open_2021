import React from "react";

const Weather = ({ city }) => {
  return (
    <>
      <h3>Weather in {city} </h3>
      <p>
        <b>Temperature: </b>
      </p>

      <p>
        <b>Wind: </b>
      </p>
    </>
  );
};

export default Weather;
