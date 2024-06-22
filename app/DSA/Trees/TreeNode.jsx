import React from 'react';

const TreeNode = ({ node, highlighted }) => {
  const { value, children } = node;

  return (
    <div className={`tree-node ${highlighted ? 'highlighted' : ''}`}>
      <div className="node-value">{value === -1 ? '' : value}</div>
      {children && (
        <div className="tree-children">
          {children.map((child, index) => (
            <TreeNode key={index} node={child} highlighted={child.highlighted} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
