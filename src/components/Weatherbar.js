import React, { Component } from 'react';
import sunny from './images/sunny.avif';
import rainy from './images/cold.jpg';
import windy from './images/windy.jpg';
import nightImage from './images/night.png';
import morningImage from './images/morning.png';
import './Weatherstyle.css';

export default class Weatherbar extends Component {
  render() {
    const { temperature, windspeed, timezoneOffset } = this.props;

    // Determine weather image based on temperature
    let weatherImage;
    if (temperature >= 25) {
      weatherImage = sunny; // Use sunny image for high temperature
    } else {
      weatherImage = rainy; // Use rainy image for low temperature
    }

    // Calculate current time adjusted for timezoneOffset
    const currentDate = new Date();
    const localTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000); // Convert local time to UTC time in milliseconds
    const timeZoneOffsetMs = timezoneOffset * 3600000; // Convert hours to milliseconds
    const finalDate = new Date(localTime + timeZoneOffsetMs); // Create new Date object adjusted to the selected country's timezone

    const currentTime = finalDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // Determine time of day image based on current hour
    let timeOfDayImage;
    const currentHour = finalDate.getUTCHours();
    if (currentHour >= 5 && currentHour < 18) {
      timeOfDayImage = morningImage; // Daytime image
    } else {
      timeOfDayImage = nightImage; // Nighttime image
    }

    return (
      <div id="weather-container">
        <div className="card-group">
          <div className="card">
            <img src={timeOfDayImage} className="card-img-top" alt="Time of Day" />
            <div className="card-body">
              <h5 className="card-title">Time</h5>
              <p className="card-text">{currentTime}</p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img src={weatherImage} className="card-img-top" alt="Weather" />
            <div className="card-body">
              <h5 className="card-title">Temperature</h5>
              <p className="card-text">{temperature}</p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img src={windy} className="card-img-top" alt="Wind Speed" />
            <div className="card-body">
              <h5 className="card-title">Wind Speed</h5>
              <p className="card-text">{windspeed}</p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
