"use client";
import React, { useState } from 'react';

import '@/app/globals.css'; // Import the CSS file with Polymorph theme styles


const MergeSortVisualization = () => {
  const [inputArray, setInputArray] = useState([4, 3, 8, 7, 2, 1, 6, 5]);
  const [isRunning, setIsRunning] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState('');
  const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());

  const getNormalizedHeight = (value, min, max) => {
    // Normalize the height between 20px and 200px
    const minHeight = 20;
    const maxHeight = 200;
    return ((value - min) / (max - min)) * (maxHeight - minHeight) + minHeight;
  };

  const playTone = (value, min, max) => {
    if (min === max) {
      return; // Avoid division by zero if all values in the array are the same
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const minFreq = 200; // Minimum frequency for the tone
    const maxFreq = 1000; // Maximum frequency for the tone
    const frequency = ((value - min) / (max - min)) * (maxFreq - minFreq) + minFreq;

    if (!isFinite(frequency)) {
      return; // Avoid playing a tone if the frequency is not a finite number
    }

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const mergeSort = async (arr, start, end) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSort(arr, start, mid);
      await mergeSort(arr, mid + 1, end);
      await merge(arr, start, mid, end);
    }
  };

  const merge = async (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
      playTone(arr[k], minVal, maxVal); // Play tone effect
      setInputArray([...arr]);
    }

    while (i < left.length) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization
      arr[k] = left[i];
      i++;
      k++;
      playTone(arr[k], minVal, maxVal); // Play tone effect
      setInputArray([...arr]);
    }

    while (j < right.length) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization
      arr[k] = right[j];
      j++;
      k++;
      playTone(arr[k], minVal, maxVal); // Play tone effect
      setInputArray([...arr]);
    }
  };

  const handleMergeSort = async () => {
    setIsRunning(true);
    await mergeSort([...inputArray], 0, inputArray.length - 1);
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
      <h1 className="heading">Merge Sort Visualization</h1>
      <div className="controls">
        <button onClick={handleMergeSort} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Merge Sort'}
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

export default MergeSortVisualization;
