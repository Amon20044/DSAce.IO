"use client";
import React, { useState } from 'react';
import '@/app/globals.css'; // Import the CSS file with Polymorph theme styles

// Function to deep clone the entire tree structure
const deepCloneTree = (node) => {
  if (!node) return null;
  const clonedNode = { ...node }; // Shallow copy of the node
  clonedNode.children = clonedNode.children.map(child => deepCloneTree(child)); // Recursively clone children
  return clonedNode;
};

// Function to find a node by value in the tree
const findNodeInTree = (node, value) => {
  if (!node) return null;
  if (node.value === value) return node;
  // Recursively search in children
  for (let child of node.children) {
    const foundNode = findNodeInTree(child, value);
    if (foundNode) return foundNode;
  }
  return null; // Return null if node with value is not found
};

const TreeNode = ({ node, highlighted }) => (
  <div className={`tree-node ${highlighted ? 'highlighted' : ''}`}>
    {node.value}
    {node.children && (
      <div className="tree-children">
        {node.children.map((child, index) => (
          <TreeNode key={index} node={child} highlighted={child.highlighted} />
        ))}
      </div>
    )}
  </div>
);

const TreeTraversalVisualization = () => {
  const initialTree = {
    value: 1,
    children: [
      {
        value: 2,
        children: [
          { value: 4, children: [] },
          { value: 5, children: [] }
        ]
      },
      {
        value: 3,
        children: [
          { value: 6, children: [] },
          { value: 7, children: [] }
        ]
      }
    ]
  };

  const [tree, setTree] = useState(initialTree);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('');
  const [currentNode, setCurrentNode] = useState(null);

  const resetTree = (node) => {
    node.highlighted = false;
    if (node.children) {
      node.children.forEach(resetTree);
    }
  };

  const highlightNode = async (node) => {
    const updatedTree = deepCloneTree(tree); // Deep clone the entire tree
    const nodeToUpdate = findNodeInTree(updatedTree, node.value); // Find the corresponding node in the cloned tree
    if (nodeToUpdate) {
      nodeToUpdate.highlighted = true; // Set highlighted to true for the found node
      setTree(updatedTree); // Update state with the updated tree

      setCurrentNode(node); // Set current node for visualization
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization

      nodeToUpdate.highlighted = false; // Reset highlighted to false after delay
      setTree(updatedTree); // Update state with the reset tree
    }
  };

  const bfs = async () => {
    const queue = [tree];
    while (queue.length) {
      const node = queue.shift();
      await highlightNode(node);
      if (node.children) {
        queue.push(...node.children);
      }
    }
  };

  const dfs = async (node) => {
    await highlightNode(node);
    if (node.children) {
      for (const child of node.children) {
        await dfs(child);
      }
    }
  };

  const handleStart = async (algo) => {
    setIsRunning(true);
    setAlgorithm(algo);
    resetTree(tree);
    setTree(initialTree);

    if (algo === 'BFS') {
      await bfs();
    } else if (algo === 'DFS') {
      await dfs(tree);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setTree(initialTree);
    setCurrentNode(null);
  };

  return (
    <div className="container">
      <h1 className="heading">Tree Traversal Visualization</h1>
      <div className="controls">
        <button onClick={() => handleStart('BFS')} disabled={isRunning}>
          {isRunning && algorithm === 'BFS' ? 'Running...' : 'Run BFS'}
        </button>
        <button onClick={() => handleStart('DFS')} disabled={isRunning}>
          {isRunning && algorithm === 'DFS' ? 'Running...' : 'Run DFS'}
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div className="tree-container">
        {tree && <TreeNode node={tree} highlighted={currentNode === tree} />}
      </div>
    </div>
  );
};

export default TreeTraversalVisualization;
