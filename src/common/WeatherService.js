import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherService = {
  getWeatherForecast: async (city) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // You can change this to 'imperial' for Fahrenheit
        },
      });

      // Extracting five records per day with temperature, pressure, and humidity information
      const forecastData = [];
      const seenDates = new Set();

      response.data.list.forEach((reading) => {
        const date = reading.dt_txt.split(' ')[0];
        if (!seenDates.has(date) && forecastData.length < 5) {
          seenDates.add(date);

          const dayData = {
            date: date,
            temperature: {
              max: -Infinity,
              min: Infinity,
            },
            pressure: {
              max: -Infinity,
              min: Infinity,
            },
            humidity: {
              max: -Infinity,
              min: Infinity,
            },
          };

          forecastData.push(dayData);
        }

        const currentDay = forecastData[forecastData.length - 1];

        // Update temperature
        currentDay.temperature.max = Math.max(currentDay.temperature.max, reading.main.temp_max);
        currentDay.temperature.min = Math.min(currentDay.temperature.min, reading.main.temp_min);

        // Update pressure
        currentDay.pressure.max = Math.max(currentDay.pressure.max, reading.main.pressure);
        currentDay.pressure.min = Math.min(currentDay.pressure.min, reading.main.pressure);

        // Update humidity
        currentDay.humidity.max = Math.max(currentDay.humidity.max, reading.main.humidity);
        currentDay.humidity.min = Math.min(currentDay.humidity.min, reading.main.humidity);
      });

      console.log(forecastData);
      return forecastData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },
};

export default WeatherService;
