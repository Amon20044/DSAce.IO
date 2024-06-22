// HomePage.jsx
import React from 'react';
import Link from 'next/link';
import "./globals.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to DSA Visualizations</h1>
      <ul className="topic-list">
        <ul>
          <Link href="/DSA/KadenesAlgo" className='Algo'>Kadane's Algorithm</Link>
        </ul>
        <ul>
          <Link href="/DSA/BinarySearch" className='Algo'>Binary Search</Link>
        </ul>
        <ul>
          <Link href="/DSA/MergeSort" className='Algo'>Merge Sort</Link>
        </ul>
        <ul>
          <Link href="/DSA/ShellSort" className='Algo'>Shell Sort</Link>
        </ul>
        <ul>
          <Link href="/DSA/BubbleSort" className='Algo'>Bubble Sort</Link>
        </ul>
        <ul>
          <Link href="/DSA/Trees" className='Algo'>Trees</Link>
        </ul>
        <ul>Coming Soon ...</ul>
        <ul>...</ul>
        <ul>...</ul>
        <ul>...</ul>
        <ul>...</ul>
        <ul>...</ul>
        <ul>...</ul>
        <ul>...</ul>

        {/* Add more topics as needed */}
      </ul>

      {/* Example of including the KadanesAlgo component */}

    </div>
  );
};

export default HomePage;
