import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [cityWeather, setCityWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState("");

  const hook = () => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: city,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setCityWeather(response.data.current);
        setWeatherIcon(response.data.current.weather_icons);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(hook, [city]);

  return (
    <>
      <h3>Weather in {city} </h3>

      <p>
        <b>Temperature: </b> {cityWeather.temperature} Celcius
      </p>

      <img
        src={weatherIcon[0]}
        alt="Weather Icon"
        width={120}
        height={80}
        mode="fit"
      ></img>

      <p>
        <b>Wind:</b> {cityWeather.wind_speed} mph direction{" "}
        {cityWeather.wind_dir}
      </p>
    </>
  );
};

export default Weather;
