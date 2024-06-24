"use client";
import React, { useState } from 'react';
import '@/app/globals.css'; // Import your CSS file

const App = () => {
  const [stations, setStations] = useState([0, 10, 20, 30]);
  const [k, setK] = useState(3);
  const [howMany, setHowMany] = useState(Array(stations.length - 1).fill(0));
  const [maxDistance, setMaxDistance] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [customStations, setCustomStations] = useState('');
  const [customK, setCustomK] = useState(3);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runAlgorithm = async () => {
    setIsRunning(true);
    let howManyCopy = Array(stations.length - 1).fill(0);
    let n = stations.length;

    for (let gasStations = 1; gasStations <= k; gasStations++) {
      let maxSection = -1;
      let maxInd = -1;

      for (let i = 0; i < n - 1; i++) {
        let diff = stations[i + 1] - stations[i];
        let sectionLength = diff / (howManyCopy[i] + 1);
        if (sectionLength > maxSection) {
          maxSection = sectionLength;
          maxInd = i;
        }
      }

      howManyCopy[maxInd]++;
      setHowMany([...howManyCopy]);
      await delay(300);
    }

    let maxAns = -1;
    for (let i = 0; i < n - 1; i++) {
      let diff = stations[i + 1] - stations[i];
      let sectionLength = diff / (howManyCopy[i] + 1);
      maxAns = Math.max(maxAns, sectionLength);
    }

    setMaxDistance(maxAns);
    setIsRunning(false);
  };

  const handleStationsChange = (e) => {
    setCustomStations(e.target.value);
  };

  const handleKChange = (e) => {
    setCustomK(Number(e.target.value));
  };

  const applyCustomValues = () => {
    const newStations = customStations.split(',').map(Number);
    setStations(newStations);
    setK(customK);
    setHowMany(Array(newStations.length - 1).fill(0));
    setMaxDistance(null);
  };

  return (
    <div className="container">
      <h1>Minimize Max Distance</h1>
      <div>
        <label>
          Custom Stations (comma separated):
          <input
            type="text"
            value={customStations}
            onChange={handleStationsChange}
            disabled={isRunning}
          />
        </label>
        <br />
        <label>
          Number of Gas Stations:
          <input
            type="number"
            value={customK}
            onChange={handleKChange}
            disabled={isRunning}
          />
        </label>
        <button onClick={applyCustomValues} disabled={isRunning}>Apply</button>
      </div>
      <div className="array-container">
        {stations.map((station, index) => (
          <div key={index} className="station">
            <div className="station-value">{station}</div>
            {index < stations.length - 1 && (
              <div className={`section ${howMany[index] ? 'highlight' : ''}`}>
                <div className="section-value">
                  {(stations[index + 1] - station) / (howMany[index] + 1)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="result">
        <p>Max Minimized Distance: {maxDistance}</p>
      </div>
      <button onClick={runAlgorithm} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Run Algorithm'}
      </button>
    </div>
  );
};

export default App;
