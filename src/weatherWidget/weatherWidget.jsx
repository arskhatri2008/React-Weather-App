import './weatherWidget.css'

const WeatherCard = ({weatherData}) => {
    return(
    <div className='card'>
        <div>
            City Name: {weatherData?.name}
        </div>
    <br />
        <div>
            Country: {weatherData?.sys?.country}
        </div>
    <br />
        <div className='temp'>
            {weatherData?.main?.temp}°C
        </div>
    <br />
        <div>
            Humidity: {weatherData?.main?.humidity}
        </div>
    <br />
        <div>
            Wind speed: {weatherData?.wind?.speed}
        </div>
    <br />
        <div>
            Weather: {weatherData?.weather[0]?.description}
        </div>
    </div>
    )
}

export default WeatherCard