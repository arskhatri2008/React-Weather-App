import axios from 'axios';
import { useRef, useState } from 'react';
import WeatherCard from '../weatherWidget/weatherWidget';

const Home = () =>{
    const [weatherData , setWeatherData] = useState([])
    const cityNameRef = useRef(null)
    
    const submitHandler = async (e) => {
        e.preventDefault();
        // not recommended below method for get input value
        // let cityName = document.querySelector('#cityName').value
        let apiKey = '1eb2b0718446fe54a6718bc2ed5f4a03'
        console.log('cityName: ', cityNameRef.current.value)
        try{
        const response = await axios.get
        (`https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${apiKey}&units=metric`)

            console.log(response.data)
            setWeatherData([response.data, ...weatherData])
        }catch(error){

            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="cityName">City Name: </label>
                <input type="text" name="" id="cityName" required minLength={2} maxLength={20} ref={cityNameRef}></input>
                <br />
                <button type="submit">Get Weather</button>
            </form>
            <hr />

            {weatherData.length ? (
                weatherData.map((eachWeatherDAta , index) => {
                    return <WeatherCard key={index} weatherData={eachWeatherDAta} />
                })
                ) : (<div>No Data</div>)}

        </div>
    )
}

export default Home