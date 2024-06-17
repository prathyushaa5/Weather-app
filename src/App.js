import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Weather from './components/Weather';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDay: true // Assume it starts as day
    };
  }

  componentDidMount() {
    this.updateBackground(); // Call it once on mount
    this.intervalID = setInterval(
      () => this.updateBackground(),
      60000 // Update every minute (adjust as needed)
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateBackground() {
    const currentHour = new Date().getHours();
    // Determine if it's day or night based on the current hour
    const isDay = currentHour >= 6 && currentHour < 18;

    // Update state only if necessary to prevent unnecessary re-renders
    if (isDay !== this.state.isDay) {
      this.setState({ isDay });
    }
  }

  render() {
    const { isDay } = this.state;
    return (
      <div className={isDay ? 'day-background' : 'night-background'} id="body">
        <Navbar />
        <Weather />
      </div>
    );
  }
}
