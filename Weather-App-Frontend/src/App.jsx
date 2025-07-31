import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css"; // Create this CSS file

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const fetchWeather = () => {
        if (!city.trim()) return;
        axios
            .get(`http://localhost:8080/api/weather/${city}`)
            .then((response) => {
                setWeather(response.data);
                setError("");
            })
            .catch(() => {
                setError("City not found");
                setWeather(null);
            });
    };

    return (
        <div className="weather-app bg-primary" >
            <div className="container text-center py-5">
                <h1 className="text-white mb-4" data-aos="fade-down">🌤 Weather Forecast</h1>

                <div className="input-group mb-4 w-75 mx-auto" data-aos="fade-up">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="btn btn-primary bg-secondary" onClick={fetchWeather}>
                        Get Weather
                    </button>
                </div>

                {error && <p className="text-danger" data-aos="fade-in">{error}</p>}

                {weather && (
                    <div
                        className="card shadow-lg p-4 mx-auto weather-card"
                        data-aos="zoom-in"
                    >
                        <h2 className="text-center">{weather.name}</h2>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="icon"
                            className="weather-icon mx-auto"
                        />
                        <p className="lead">{weather.weather[0].description}</p>
                        <h4>🌡 {weather.main.temp} °C</h4>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
