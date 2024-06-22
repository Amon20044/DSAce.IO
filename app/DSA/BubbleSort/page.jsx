"use client";
import React, { useState } from 'react';
import useSound from 'use-sound';
import '@/app/globals.css';

const BubbleSortVisualization = () => {
  const [inputArray, setInputArray] = useState([4, 3, 8, 7, 2, 1, 6, 5]);
  const [isRunning, setIsRunning] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());

  const getNormalizedHeight = (value, min, max) => {
    const minHeight = 20;
    const maxHeight = 200;
    return ((value - min) / (max - min)) * (maxHeight - minHeight) + minHeight;
  };

  const playTone = (value, min, max) => {
    if (min === max) {
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const minFreq = 200;
    const maxFreq = 1000;
    const frequency = ((value - min) / (max - min)) * (maxFreq - minFreq) + minFreq;

    if (!isFinite(frequency)) {
      return;
    }

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const bubbleSort = async (arr) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          playTone(arr[j], minVal, maxVal);
          setInputArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization
        }
      }
    }
  };

  const handleBubbleSort = async () => {
    setIsRunning(true);
    await bubbleSort([...inputArray]);
    setIsRunning(false);
  };

  const handleInputChange = (event) => {
    setCustomArrayInput(event.target.value);
  };

  const handleArraySubmit = () => {
    const customArray = customArrayInput.split(',').map(num => parseInt(num.trim(), 10));
    setInputArray(customArray);
  };

  const handleReset = () => {
    setInputArray([4, 3, 8, 7, 2, 1, 6, 5]);
    setCustomArrayInput('');
  };

  const minVal = Math.min(...inputArray);
  const maxVal = Math.max(...inputArray);

  return (
    <div className="container">
      <h1 className="heading">Bubble Sort Visualization</h1>
      <div className="controls">
        <button onClick={handleBubbleSort} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Bubble Sort'}
        </button>
        <input
          type="text"
          placeholder="Enter comma-separated values"
          value={customArrayInput}
          onChange={handleInputChange}
          disabled={isRunning}
        />
        <button onClick={handleArraySubmit} disabled={isRunning}>
          Set Custom Array
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div className="array-container">
        {inputArray.map((num, index) => (
          <div
            key={index}
            className="array-block"
            style={{ height: `${getNormalizedHeight(num, minVal, maxVal)}px` }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
