"use client";
import React, { useState } from 'react';
import '@/app/globals.css'; // Import the CSS file with Polymorph theme styles

const KadanesAlgo = () => {
  const [inputArray, setInputArray] = useState([4, 3, 8, 7, 2, 1, 6, 5]);
  const [maxEndingHere, setMaxEndingHere] = useState(0);
  const [maxSoFar, setMaxSoFar] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [iterations, setIterations] = useState(0); // State for number of iterations
  const [magnitudeArray, setMagnitudeArray] = useState([]);
  const [normalizedArray, setNormalizedArray] = useState([]);

  // Function to calculate magnitude of the array
  const calculateMagnitude = (array) => {
    const magnitudeArray = array.map(num => Math.abs(num));
    return magnitudeArray;
  };

  // Function to normalize heights of the array
  const normalizeHeights = (array) => {
    const max = Math.max(...array.map(Math.abs)); // Calculate max of absolute values
    const normalizedArray = array.map(num => Math.abs(num) / max); // Normalize each element
    return normalizedArray;
  };

  const runKadaneAlgorithm = async () => {
    setIsRunning(true);

    const magnitudeArray = calculateMagnitude(inputArray);
    const normalizedArray = normalizeHeights(inputArray);
    setMagnitudeArray(magnitudeArray);
    setNormalizedArray(normalizedArray);

    let currentMax = inputArray[0];
    let globalMax = inputArray[0];
    let start = 0;
    let tempStartIndex = 0;
    let tempEndIndex = 0;
    let iterationCount = 0;

    for (let i = 1; i < inputArray.length; i++) {
      // Simulate delay for each iteration
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjusted delay for smoother visualization
      
      iterationCount++;

      if (currentMax + inputArray[i] < inputArray[i]) {
        currentMax = inputArray[i];
        tempStartIndex = i;
      } else {
        currentMax += inputArray[i];
      }

      if (currentMax > globalMax) {
        globalMax = currentMax;
        tempEndIndex = i;
        start = tempStartIndex;
      }

      // Update state for visual rendering
      setMaxEndingHere(currentMax);
      setMaxSoFar(globalMax);
      setStartIndex(start);
      setEndIndex(tempEndIndex);
      setIterations(iterationCount);
    }

    setIsRunning(false);
  };

  const resetValues = () => {
    setMaxEndingHere(0);
    setMaxSoFar(0);
    setStartIndex(0);
    setEndIndex(0);
    setCustomArrayInput('');
    setIterations(0);
    setMagnitudeArray([]);
    setNormalizedArray([]);
  };

  const handleCustomArrayChange = (event) => {
    setCustomArrayInput(event.target.value);
  };

  const handleCustomArraySubmit = () => {
    const customArray = customArrayInput.split(',').map(num => parseInt(num.trim(), 10));
    setInputArray(customArray);
    resetValues();
  };

  const renderArray = () => {
    return (
      <div className="array-container">
        {inputArray.map((num, index) => (
          <div
            key={index}
            className={`array-element ${index >= startIndex && index <= endIndex ? 'highlight' : ''}`}
            style={{ height: `${normalizedArray[index] * 100}%` }}
          >
            <div className="array-element-value">{num}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="heading">Kadane's Algorithm Demo</h1>
      <div className="controls">
        <button onClick={runKadaneAlgorithm} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Kadane\'s Algorithm'}
        </button>
        <button onClick={resetValues} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div className="result">
        <p>Max Subarray Sum: {maxSoFar}</p>
        <p>Subarray: [{inputArray.slice(startIndex, endIndex + 1).join(', ')}]</p>
        <p>Iterations: {iterations}</p>
      </div>
      {renderArray()}
      <div className="custom-array">
        <input
          type="text"
          placeholder="comma-separated array"
          value={customArrayInput}
          onChange={handleCustomArrayChange}
        />
        <button onClick={handleCustomArraySubmit}>Set Custom Array</button>
      </div>
    </div>
  );
};

export default KadanesAlgo;
