import React, { Component } from 'react';
import Weatherbar from './Weatherbar';
import './Weatherstyle.css';


export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [
        { name: 'India', latitude: 20.5937, longitude: 78.9629, timezoneOffset: 5.5 },
        { name: 'United States', latitude: 37.0902, longitude: -95.7129, timezoneOffset: -5 },
        { name: 'Greenland', latitude: 71.7069, longitude: -42.6043, timezoneOffset: -3 },
        { name: 'United Arab Emirates', latitude: 23.4241, longitude: 53.8478, timezoneOffset: 4 },
        { name: 'United Kingdom', latitude: 55.3781, longitude: -3.4360, timezoneOffset: 0 },
        { name: 'China', latitude: 35.8617, longitude: 104.1954, timezoneOffset: 8 }
        // Add more countries as needed
      ],
      selectedCountry: 'India', // Default selection
      weather: null,
      loading: false
    };
  }

  componentDidMount() {
    // Fetch weather data for the default selected country on mount
    this.fetchWeatherData();
  }

  fetchWeatherData = async () => {
    const { selectedCountry, countries } = this.state;
    const country = countries.find(c => c.name === selectedCountry);

    if (country) {
      const { latitude, longitude } = country;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        console.log(parsedData);

        this.setState({
          weather: parsedData.current,
          loading: true
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    this.setState({ selectedCountry, loading: false }, () => {
      this.fetchWeatherData();
    });
  };

  render() {
    const { countries, selectedCountry, weather, loading } = this.state;

    return (
      <div>
        <div className="container my-3">
          <div className="row">
            <div className="col-md-4">
        
              <select
                id="countrySelect"
                className="form-control"
                value={selectedCountry}
                onChange={this.handleCountryChange}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="row mt-3">
              {/* Conditionally render Weatherbar only if weather data is available */}
              {weather && weather.temperature_2m && weather.wind_speed_10m && (
                <Weatherbar
                  temperature={weather.temperature_2m}
                  windspeed={weather.wind_speed_10m}
                  timezoneOffset={countries.find(c => c.name === selectedCountry).timezoneOffset}
                />
              )}
            </div>
          ) : (
            <div className="row mt-3">
              <div className="col">Loading...</div>
            </div>
          )}

        </div>
      </div>
    );
  }
}
