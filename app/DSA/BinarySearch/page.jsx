"use client"
import React, { useState } from 'react';
import '@/app/globals.css'; // Import the CSS file with Polymorph theme styles

const BinarySearch = () => {
  const [inputArray, setInputArray] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]); // Example initial sorted array
  const [searchValue, setSearchValue] = useState(''); // Input for custom search value
  const [searchIndex, setSearchIndex] = useState(-1); // Index of found element, -1 if not found
  const [isRunning, setIsRunning] = useState(false); // State for running search
  const [iterations, setIterations] = useState(0); // State for number of iterations
  const [notFoundVisible, setNotFoundVisible] = useState(false); // State to toggle not found message
  const [leftIndex, setLeftIndex] = useState(-1); // Index of left boundary for visualization
  const [midIndex, setMidIndex] = useState(-1); // Index of mid point for visualization
  const [rightIndex, setRightIndex] = useState(-1); // Index of right boundary for visualization

  const handleBinarySearch = async () => {
    setIsRunning(true);
    let start = 0;
    let end = inputArray.length - 1;
    let mid;
    let iterationCount = 0;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);

      // Simulate delay for each iteration
      await new Promise((resolve) => setTimeout(resolve, 300));

      iterationCount++;

      if (inputArray[mid] === parseInt(searchValue)) {
        setSearchIndex(mid);
        setNotFoundVisible(false); // Hide not found message if found
        break;
      } else if (inputArray[mid] < parseInt(searchValue)) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }

      // Update visualization indices
      setLeftIndex(start);
      setMidIndex(mid);
      setRightIndex(end);
    }

    if (start > end) {
      setSearchIndex(-1);
      setNotFoundVisible(true); // Show not found message if not found
    }

    setIterations(iterationCount);
    setIsRunning(false);
  };

  const resetValues = () => {
    setSearchValue('');
    setSearchIndex(-1);
    setIterations(0);
    setNotFoundVisible(false); // Hide not found message on reset
    setLeftIndex(-1); // Reset indices on reset
    setMidIndex(-1);
    setRightIndex(-1);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setNotFoundVisible(false); // Hide not found message when input changes
  };

  const handleSearchSubmit = () => {
    // Convert input value to integer for comparison
    const value = parseInt(searchValue);
    setSearchValue(value);

    // Perform Binary Search
    handleBinarySearch();
  };

  const renderArray = () => {
    return (
      <div className="array-container">
        {inputArray.map((num, index) => (
          <div
            key={index}
            className={`array-element ${index === searchIndex ? 'highlight' : ''} ${index === leftIndex ? 'left-index' : ''} ${index === midIndex ? 'mid-index' : ''} ${index === rightIndex ? 'right-index' : ''}`}
          >
            {num}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="heading">Binary Search Visualization</h1>
      {notFoundVisible && (
        <div className="not-found-message">
          <p>Element not found</p>
        </div>
      )}
      <div className="custom-array">
        <div className="custom-array">
          <input
            type="text"
            placeholder="Enter value to search"
            value={searchValue}
            onChange={handleInputChange}
            disabled={isRunning}
          />
          <button onClick={handleSearchSubmit} disabled={isRunning}>
            Search
          </button>
        </div>
        <button onClick={resetValues} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div className="result">
        {searchIndex !== -1 ? (
          <p>Element found at index: {searchIndex}</p>
        ) : (
          <p>Iterations: {iterations}</p>
        )}
      </div>
      {renderArray()}
      <div className="custom-array">
        <p>Custom Array Input:</p>
        <input
          type="text"
          placeholder="Enter custom array (comma-separated)"
          value={inputArray.join(', ')}
          onChange={(e) => setInputArray(e.target.value.split(',').map(num => parseInt(num.trim(), 10)))}
          disabled={isRunning}
        />
      </div>
    </div>
  );
};

export default BinarySearch;
