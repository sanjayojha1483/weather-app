import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import mist from "../images/mist.png";
import clear from "../images/Clear.png";
import err from "../images/error.png";

const Myapp = () => {
  const [search, setsearch] = useState("");
  const [data, setdata] = useState(null);
  const [error, seterror] = useState("");

  const API_KEY = "439da858d0907806f9b769b60711d013";

  const handleInput = (event) => {
    setsearch(event.target.value);
  };

  const myFun = async () => {
    if (!search) {
      seterror("Please enter city name");
      setdata(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const jsonData = await res.json();

    if (jsonData.cod === "404") {
      seterror("Invalid city name");
      setdata(null);
    } else {
      setdata(jsonData);
      seterror("");
    }

    setsearch("");
  };

  return (
    <>
      {/* 🔥 BACKGROUND */}
      <div className="bg-animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔥 MAIN UI */}
      <div className="container">

        <form
          className="inputs"
          onSubmit={(e) => {
            e.preventDefault();
            myFun();
          }}
        >
          <input
            placeholder="Enter city"
            value={search}
            onChange={handleInput}
          />

          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {error && (
          <div className="error">
            <p>{error}</p>
            <img src={err} alt="error" />
          </div>
        )}

        {data && data.weather && (
          <div className="weathers">
            <h2 className="cityname">{data.name}</h2>

            <img
              src={
                data.weather[0].main === "Clouds"
                  ? cloud
                  : data.weather[0].main === "Rain"
                  ? rain
                  : data.weather[0].main === "Clear"
                  ? clear
                  : data.weather[0].main === "Mist"
                  ? mist
                  : ""
              }
              alt="weather"
            />

            <h2 className="temprature">
              {Math.trunc(data.main.temp)}°C
            </h2>

            <p className="climate">
              {data.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Myapp;