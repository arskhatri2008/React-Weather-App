import axios from "axios";
import { useEffect, useRef, useState } from "react";
import WeatherCard from "../weatherWidget/weatherWidget";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cityNameRef = useRef(null);

  useEffect(() => {
    setIsLoading(true)
    const controller = new AbortController();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(location) => {
        console.log("location", location);
        try {
            let apiKey = "1eb2b0718446fe54a6718bc2ed5f4a03"
            const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`
            ,{
              signal: controller.signal
           }
          );

          console.log(response.data);
          setWeatherData([response.data, ...weatherData]);
          setIsLoading(false)
        } catch (error) {
          console.log(error);
          setIsLoading(false)
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      //cleanup function
      controller.abort()
    }

  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // not recommended below method for get input value
    // let cityName = document.querySelector('#cityName').value
    let apiKey = "1eb2b0718446fe54a6718bc2ed5f4a03";
    console.log("cityName: ", cityNameRef.current.value);
    try {
        setIsLoading(true)
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${apiKey}&units=metric`
        );

      console.log(response.data);
      setWeatherData([response.data, ...weatherData]);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="cityName">City Name: </label>
        <input
          type="text"
          name=""
          id="cityName"
          required
          minLength={2}
          maxLength={20}
          ref={cityNameRef}
        ></input>
        <br />
        <button type="submit">Get Weather</button>
      </form>
      <hr />
      {isLoading ? <div>Loading...</div> : null}
      {!weatherData ? <div>No Data</div> : null}

      {weatherData.length ? (
        weatherData.map((eachWeatherData, index) => {
          return <WeatherCard key={index} weatherData={eachWeatherData} />;
        })
      ) : (
        // <div>No Data</div>
        null
      )}
    </div>
  );
};

export default Home;
