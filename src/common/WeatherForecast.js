import React, { useState } from 'react';
import WeatherService from './WeatherService';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const WeatherForecast = () => {
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await WeatherService.getWeatherForecast(city);
            setForecastData(data);
        } catch (error) {
            console.error(error);
            setError('Invalid city name. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='header'>
                <div>
                    <h1 className='orange-color'>Weather in your city</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        className='search-textbox'
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}> <FontAwesomeIcon icon={faQuestionCircle} />&nbsp;Search</button>
                </div>
                    <div>
                       {loading && <Loader />}
                    </div>
            </div>
            {error && <p className="error">{error}</p>}

            {forecastData && !loading && (
                <div>
                    <h2 className='orange-color'>5 Days Forecast for {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                    <div className="forecast-container">
                        {forecastData.map((day) => (
                            <div key={day.date} className="forecast-card">
                                <table>
                                    <thead>
                                        <td colSpan={2} className='table-date'><b>Date:</b> {new Date(day.date).toLocaleDateString()}</td>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={2} className='table-bg-grey'><b>Temperature</b></td>
                                        </tr>
                                        <tr className='table-bg-grey'>
                                            <td><b>Min</b></td>
                                            <td><b>Max</b></td>
                                        </tr>
                                        <tr className='table-bg-grey'>
                                            <td>{day.temperature.min}°C</td>
                                            <td>{day.temperature.max}°C</td>
                                        </tr>
                                        <tr>
                                            <td><b>Pressure</b></td>
                                            <td>{day.pressure.min}hPa</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>Humidity</b>
                                            </td>
                                            <td>
                                                {day.humidity.min}%
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;
